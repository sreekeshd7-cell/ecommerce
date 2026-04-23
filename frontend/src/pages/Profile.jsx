import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="loading">Please log in to view your profile.</div>;
  }

  return (
    <div className="auth-page" style={{ alignItems: "flex-start", marginTop: "40px" }}>
      <div className="auth-card" style={{ maxWidth: "600px" }}>
        <h2>My Profile</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px", textAlign: "left" }}>
          <div>
            <strong>Name:</strong>
            <p style={{ margin: "5px 0", padding: "10px", background: "var(--bg-color)", borderRadius: "5px" }}>{user.name}</p>
          </div>
          <div>
            <strong>Email:</strong>
            <p style={{ margin: "5px 0", padding: "10px", background: "var(--bg-color)", borderRadius: "5px" }}>{user.email}</p>
          </div>
          <div>
            <strong>Mobile Number:</strong>
            <p style={{ margin: "5px 0", padding: "10px", background: "var(--bg-color)", borderRadius: "5px" }}>{user.mobileNumber || "Not provided"}</p>
          </div>
          <div>
            <strong>Address:</strong>
            <p style={{ margin: "5px 0", padding: "10px", background: "var(--bg-color)", borderRadius: "5px" }}>{user.address || "Not provided"}</p>
          </div>
          <div>
            <strong>Role:</strong>
            <p style={{ margin: "5px 0", padding: "10px", background: "var(--bg-color)", borderRadius: "5px", textTransform: "capitalize" }}>{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
