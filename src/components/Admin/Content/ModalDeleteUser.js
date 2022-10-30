import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteUser = (props) => {
    const { show, setShow, userDelete } = props;

    const handleClose = () => setShow(false);
    const handleSubmitDelete = () => {
        alert(".");
    }
    return (
        <>
            <Button variant="primary" hidden>
                Launch static backdrop modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        ARE YOU SURE DELETE
                        <p>
                            {userDelete && userDelete.email ? userDelete.email : "<3"}
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Content
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleSubmitDelete()}

                    >Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;