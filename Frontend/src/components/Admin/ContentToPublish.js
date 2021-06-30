import React, { useEffect, useState } from "react";
import "./AdminUtil/style/contentToPublish";
import "./AdminUtil/style/contentToPublish.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContentToPublish = () => {
    let [Notices, setNotices] = useState([]);
    const [Click, setClick] = useState("");

    useEffect(async () => {
        //get pending editors’ contents  details
        const resNotice = await fetch(
            `http://localhost:3000/admin/getPendingNotice`
        );
        const notice = await resNotice.json();
        setNotices(notice);
    }, [Click]);

    const Approvehandle = async (id) => {
        // For approving editors’ contents
        const res = await fetch(`http://localhost:3000/admin/accept/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success("Approved");
            setClick(id);
        }
    };

    const Rejecthandle = async (id) => {
        // For rejecting editors’ contents
        const res = await fetch(`http://localhost:3000/admin/reject/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            toast.success("Rejected");
            setClick(id);
        }
    };
    return (
        <div>
            {Notices.map((content) => (
                <div className="NoticeCard" key={content._id}>
                    <h3 className="topics">{content.topic}</h3>
                    <h3 className="date">
                        {new Date(content.createdAt).toDateString()}
                    </h3>
                    <h3 className="contents">{content.content}</h3>
                    <button
                        className="approve"
                        onClick={() => Approvehandle(content._id)}
                    >
                        Approve
                    </button>
                    <button
                        className="reject"
                        onClick={() => Rejecthandle(content._id)}
                    >
                        Reject
                    </button>
                </div>
            ))}

            <ToastContainer position="top-center" />
        </div>
    );
};

export default ContentToPublish;