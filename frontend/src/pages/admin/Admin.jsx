// src/pages/admin/Admin.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users", {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  // Delete a user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/users/${userId}`, {
        withCredentials: true,
      });
      toast.success("User deleted successfully");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <header style={styles.header}>
        <h1 style={styles.heading}>Admin Panel</h1>
      </header>
      <div style={styles.pageWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td style={styles.td}>
                    {user.name || user.username || "No Name"}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteButton}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor =
                          styles.deleteButtonHover.backgroundColor)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor =
                          styles.deleteButton.backgroundColor)
                      }
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={styles.noUsers}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
//copy of ashole part:
// return (
//     <div style={styles.container}>
//       {/* <Toaster position="top-right" /> */}
//       {/* <h2 style={styles.heading}>Admin Panel</h2> */}
//       <h2>Admin Panel</h2>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Username</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user._id}>
//                 <td style={styles.td}>
//                   {user.name || user.username || "No Name"}
//                 </td>
//                 <td style={styles.td}>
//                   <button
//                     style={{ ...styles.deleteButton }}
//                     onMouseEnter={(e) =>
//                       (e.target.style.backgroundColor =
//                         styles.deleteButtonHover.backgroundColor)
//                     }
//                     onMouseLeave={(e) =>
//                       (e.target.style.backgroundColor =
//                         styles.deleteButton.backgroundColor)
//                     }
//                     onClick={() => handleDelete(user._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2" style={styles.noUsers}>
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

//check2
const styles = {
  header: {
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    padding: "1.5rem 5%",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    textAlign: "left",
    boxShadow: "0 2px 15px rgba(0,0,0,0.3)",
  },
  heading: {
    fontSize: "2rem",
    margin: 0,
  },
  //   pageWrapper: {
  //     minHeight: "2vh",
  //     padding: "8rem 5% 2rem 5%",
  //     backgroundColor: "rgba(255, 255, 255, 0.95)",
  //   },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  th: {
    backgroundColor: "#444",
    color: "#fff",
    padding: "1rem",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    fontSize: "1.2rem",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    fontSize: "1.1rem",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.7rem 1.5rem",
    cursor: "pointer",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  deleteButtonHover: {
    backgroundColor: "#c0392b",
  },
  noUsers: {
    padding: "2rem",
    textAlign: "center",
    color: "#777",
    fontSize: "1.5rem",
  },
};

export default Admin;
