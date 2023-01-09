import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Col } from "reactstrap";
import Comment from "./Comment";
import { selectCommentsByCampsiteId } from "./commentSlice";
import CommentForm from "./CommentsForm";
import Error from "../../components/Error";
import Loading from "../../components/loading";

const CommentList = ({ campsiteId }) => {
    const comments = useSelector(selectCommentsByCampsiteId(campsiteId));
    const isLoading = useSelector((state) => state.comments.isLoading);
    const errMsg = useSelector((state) => state.comments.errMsg);
    useEffect (() => {
        console.log('bop', comments)
    },[comments])

    if (isLoading) {
        return (
                <Loading />
        );
    }

    if (errMsg) {
        return (
                <Error errMsg={errMsg} />
        );
    }

    if (comments && comments.length > 0) {
        return (
            <Col md='5' className="m-1">
                <h4>Comments</h4>
                {comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />;
                })}
                <CommentForm cid={campsiteId} />
            </Col>
        );
    }
    return (
        <Col md='5' className="m-1">
            There are no comments for this campsite yet
        </Col>
    )
};

export default CommentList