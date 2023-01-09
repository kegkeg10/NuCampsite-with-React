import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validateCommentForm } from "../../utils/validateCommentForm";
import { postComment } from "./commentSlice";

const CommentForm = ({ cid }) => {
    const [modalOpen, setModalOpen] = useState(false);

        const dispatch = useDispatch();

        const handleSubmit= (values) => {
            const comment = {
                campsiteId: parseInt(cid),
                rating: values.rating,
                author: values.author,
                text: values.commentText,
                date: new Date(Date.now()).toISOString()
            }
            console.log('comment:', comment );
            dispatch(postComment(comment));
            setModalOpen(false);
        }

    return (
        <>
        <Button outline onClick={() => setModalOpen(true)}>
            <i className="fa fa-pencil fa-lg" /> Add Comment
        </Button>
        <Modal isOpen={modalOpen}>
            <ModalHeader toggle={() => setModalOpen(false)}>
                Add Comment
            </ModalHeader>
            <ModalBody>
                <Formik initialValues={{
                    rating:undefined,
                    author: '',
                    commentText: ''
                    }}
                    onSubmit={handleSubmit}
                    validate={validateCommentForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                            </FormGroup>
                                <Field
                                        name='rating'
                                        as='select'
                                        className='form-control'
                                    >
                                        <option>Select...</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Field>
                                <ErrorMessage name='rating'>
                                {(msg) => <p className="text-danger">{msg}</p> }
                                </ErrorMessage>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                            </FormGroup>
                                <Field
                                        name='author'
                                        placeholder='Your Name'
                                        className='form-control'
                                    />
                            <FormGroup>
                                <Label htmlFor="commentText">Comment</Label>
                            </FormGroup>
                                <Field
                                        name='commentText'
                                        as='textarea'
                                        rows='12'
                                        className='form-control'
                                    />
                                    <ErrorMessage name='author'>
                                    {(msg) => <p className="text-danger">{msg}</p> }
                                    </ErrorMessage>
                                <Button type='submit' color='primary'>
                                Submit
                                </Button>
                        </Form>
                </Formik>
            </ModalBody>
        </Modal>
        </>
    )
}

export default CommentForm;