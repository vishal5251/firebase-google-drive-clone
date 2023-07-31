import { useReducer, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { database } from "../firebase"
import { collection, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
}

export const ROOT_FOLDER = { name: "Root", id: null, path: [] }

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      }
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      }
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      }
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      }
    default:
      return state
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  })

  const { currentUser } = useAuth()

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
  }, [folderId, folder])

  useEffect(() => {

    async function getFolder() {
      if (folderId == null) {
        return dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        })
      }

      const querySnapshot = await getDocs(collection(database, "folders"), where("parentId", "==", folderId));

      let res = null;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        res = { id: doc.id, ...doc.data() }
      });
      if (res) {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: res },
        })
      }
      else {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        })
      }
    }

    getFolder()

  }, [folderId])

  useEffect(() => {

    async function getFolders() {
      // console.log("folderId: ", folderId, " currentUser: ", currentUser.uid)
      const q = query(collection(database, "folders"), where("parentId", "==", folderId), where("userId", "==", currentUser.uid), orderBy("createdAt"));
      const querySnapshot = await getDocs(q);

      let res = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        res.push({ id: doc.id, ...doc.data() })
      });

      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: res },
      })
    }

    getFolders()

  }, [folderId, currentUser])

  useEffect(() => {

    async function getFiles() {
      const q = query(collection(database, "files"), where("folderId", "==", folderId), where("userId", "==", currentUser.uid), orderBy("createdAt"));
      const querySnapshot = await getDocs(q);

      let res = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        res.push({ id: doc.id, ...doc.data() })
      });

      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles: res },
      })
    }

    getFiles()

  }, [folderId, currentUser])

  return state
}
