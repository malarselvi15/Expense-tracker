import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <AppBar 
    position="static" 
    sx={{ 
      background: "linear-gradient(90deg, #8e44ad, #e84393)", // Purple to Pink
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" 
    }}
  >
  
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: "bold",
            letterSpacing: "1px" 
          }}
        >
          Expense Tracker
        </Typography>
        
        <Button 
          sx={{ color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#ff6b5f" } }} 
          component={Link} 
          to="/"
        >
          Home
        </Button>
        
        <Button 
          sx={{ color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#ff6b5f" } }} 
          component={Link} 
          to="/expenses"
        >
          Expense List
        </Button>

        <Button 
          sx={{ color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#ff6b5f" } }} 
          component={Link} 
          to="/charts"
        >
          Charts
        </Button>

        {isLoggedIn ? (
          <Button 
            sx={{ color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#ff6b5f" } }} 
            onClick={onLogout}
          >
            Logout
          </Button>
        ) : (
          <Button 
            sx={{ color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#ff6b5f" } }} 
            component={Link} 
            to="/login"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
