import { useState, useEffect } from "react";
import Instance from "../../Instance";
import CommentItem from "../../comment/CommentItem";
import Pagination from "../../comment/Pagination";
import ConfirmModal from "../../comment/ConfirmModal"; // Import the ConfirmModal
import Loader from "../../comment/Loader";
import { toast } from "react-toastify";

// CommentList Component
const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [commentToToggle, setCommentToToggle] = useState(null);
  const [isCommentHidden, setIsCommentHidden] = useState(null);

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await Instance.post("/admin/getAllComments");
        const sortedComments = response.data.comments.sort(
          (a, b) =>
            new Date(b.comment_created_at) - new Date(a.comment_created_at)
        );
        setComments(sortedComments);
        // console.log(sortedComments);
      } catch (err) {
        setError("Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  // Handle comment deletion with modal confirmation
  const handleDeleteComment = (blog_id, commentId) => {
    setCommentToDelete({ blog_id, commentId });
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteComment = async () => {
    if (!commentToDelete) return;

    const { blog_id, commentId } = commentToDelete;

    try {
      await Instance.post(`/admin/deleteComment`, { commentId, blog_id });
      setComments(comments.filter((comment) => comment.id !== commentId));
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
      toast.success("Comment deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  // Handle comment visibility toggle with modal confirmation
  const handleToggleVisibility = (comment_id, isHidden) => {
    console.log(comment_id, isHidden);

    setCommentToToggle({ comment_id });
    setIsCommentHidden(isHidden); // Track the current visibility state
    setIsToggleModalOpen(true); // Open the modal for confirmation
  };

  const confirmToggleVisibility = async () => {
    if (!commentToToggle) return;

    const { comment_id } = commentToToggle;
    const isCurrentlyHidden = isCommentHidden; // Reflect the current state
    const newVisibilityState = !isCurrentlyHidden; // Toggle the visibility state
    const endpoint = isCurrentlyHidden
      ? `/admin/unhideComment`
      : `/admin/hideComment`; // Decide the endpoint based on current state

    try {
      await Instance.post(endpoint, {
        comment_id,
        Is_hidden: newVisibilityState,
      });

      // Update the comments list to reflect the new visibility
      setComments(
        comments.map((comment) =>
          comment.id === comment_id
            ? { ...comment, visible: newVisibilityState } // Update visibility in state
            : comment
        )
      );

      // Close the modal and reset the state
      setIsToggleModalOpen(false);
      setCommentToToggle(null);
      window.location.reload();
    } catch (error) {
      console.error("Failed to toggle comment visibility:", error);
    }
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter comments by search query
  const filteredComments = comments.filter((comment) =>
    comment.comment_username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle loading and error states
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-center text-3xl font-bold mb-5">Comment List</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Fans name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-teal-300"
        />
      </div>

      <ul className="flex flex-wrap gap-3">
        {currentComments.length > 0 ? (
          currentComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={handleDeleteComment}
              onToggleVisibility={handleToggleVisibility}
            />
          ))
        ) : (
          <p className="text-center w-full">No Comments found</p>
        )}
      </ul>

      {filteredComments.length > commentsPerPage && (
        <Pagination
          commentsPerPage={commentsPerPage}
          totalComments={filteredComments.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDeleteComment}
        onCancel={() => setIsDeleteModalOpen(false)}
        message="Are you sure you want to delete this comment?"
        btn1="Cancel"
        btn2="Delete"
      />

      <ConfirmModal
        isOpen={isToggleModalOpen}
        onConfirm={() => confirmToggleVisibility(isCommentHidden)}
        onCancel={() => setIsToggleModalOpen(false)}
        message={`Are you sure you want to ${
          isCommentHidden ? "unhide" : "hide"
        } this comment?`}
        btn1="Cancel"
        btn2={isCommentHidden ? "Unhide" : "Hide"}
      />
    </div>
  );
};

export default CommentList;
