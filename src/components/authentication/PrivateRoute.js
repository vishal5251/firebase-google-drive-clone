import React from "react"
import { Route, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect } from "react"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
  }, [])

  return (
    <Route
      {...rest}
      element={<Component />}

    />
  )
}
