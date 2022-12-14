import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineFolderAdd } from "react-icons/ai";
import { toast } from 'react-toastify';
import { postNewUser } from '../../serviceBE/apiService'

const ModalCreateUser = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("ADMIN");
        setImage("");
        setpreImage("");
    };
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("user");
    const [image, setImage] = useState("");
    const [prevImage, setpreImage] = useState("");
    const handleChangeImage = (e) => {
        setpreImage(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
        //setImage in state
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmit = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Email isn't valid");
            return;
        }
        if (!password || password.length < 8) {
            toast.error("Password isn't valid");
            return;
        }


        let data = await postNewUser(email, password, username, role);
        if (data && data.EC === 0) {
            toast.success("Complete");
            handleClose();
            await props.fetchListUsers();
        }
        //check error in axios. Code error: EC: data same other
        if (data && data.EC === 1) {
            toast.error(data.EM);
            handleClose();
        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add New User
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title
                    >
                        INFORMATION
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            >
                                <option value="user">USER</option>
                                <option value="admin">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className='form-label form-label-upload' htmlFor='upload'>
                                <AiOutlineFolderAdd />
                                Upload This File
                            </label>
                            <input
                                type="file"
                                hidden
                                id="upload"
                                onChange={(e) => handleChangeImage(e)}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {
                                prevImage ?
                                    <img src={prevImage} />
                                    :
                                    <span>PREVIEW</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateUser;