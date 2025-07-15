@@ .. @@
 import React, { useEffect } from 'react';
 import { Navigate, useLocation } from 'react-router-dom';
 import { isAuthenticated, hasRole, UserRole } from '@/lib/auth';
 
 interface ProtectedRouteProps {
   children: React.ReactNode;
   requiredRoles?: UserRole | UserRole[];
 }
 
 const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
   children, 
   requiredRoles 
 }) => {
   const location = useLocation();
   const isLoggedIn = isAuthenticated();
   
   // Check if user has required role(s) if specified
   const hasRequiredRole = requiredRoles 
     ? hasRole(requiredRoles) 
     : true;
   
   useEffect(() => {
     // Log for debugging
    // if (!isLoggedIn) {
    //   console.log('User not authenticated, redirecting to login');
    // } else if (!hasRequiredRole) {
    //   console.log('User does not have required role(s)');
    // }
   }, [isLoggedIn, hasRequiredRole]);
 
   if (!isLoggedIn) {
     // Redirect to login page but save the location they were trying to access
     return <Navigate to="/login\" state={{ from: location }} replace />;
   }
   
   if (!hasRequiredRole) {
     // User is logged in but doesn't have the required role
     return <Navigate to="/unauthorized\" replace />;
   }
 
   // User is authenticated and has the required role(s)
   return <>{children}</>;
 };
 
 export default ProtectedRoute;