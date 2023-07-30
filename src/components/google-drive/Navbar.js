import React from "react"
import { Navbar, Nav, Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useState } from "react"

export default function NavbarComponent() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand as={Link} to="/">
        Shweta's File Manager
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Nav>
      <Nav>
        {/* <SearchBar /> */}
        <Button onClick={() => setModalOpen(true)} className="text-white">
          Search
        </Button>
      </Nav>
      {
        modalOpen && (
          <Modal
            show={modalOpen}
            onHide={() => setModalOpen(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Search
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SearchBar />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setModalOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        )
      }
    </Navbar>
  )
}
