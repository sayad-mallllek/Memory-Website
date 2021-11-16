import React, { useEffect, useState } from "react";

const Comment = (props) => {
    const [comment, setComment] = useState([]);
    useEffect(() => {
      setComment(props.Comment);
    }, [setComment]);
    return (
        <div>
            <h4>{comment}</h4>
        </div>
    )
}

export default Comment
