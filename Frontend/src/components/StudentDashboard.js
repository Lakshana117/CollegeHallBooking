// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// const StudentDetails = () => {
//   const [students, setStudents] = useState([]);
//   const [editStudent, setEditStudent] = useState(null);

//   useEffect(() => {
//     // Fetch all students from the backend
//     axios.get('http://127.0.0.1:8080/api/students')
//       .then(response => {
//         setStudents(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the students!", error);
//       });
//   }, []);

//   // Handle delete student
//   const handleDelete = (id) => {
//     axios.delete(`http://127.0.0.1:8080/api/students/{id}`)
//       .then(() => {
//         setStudents(students.filter(student => student.id !== id));
//       })
//       .catch(error => {
//         console.error("There was an error deleting the student!", error);
//       });
//   };

//   // Handle edit student dialog open
//   const handleEditOpen = (student) => {
//     setEditStudent(student);
//   };

//   // Handle edit student dialog close
//   const handleEditClose = () => {
//     setEditStudent(null);
//   };

//   // Handle edit student form submit
//   const handleEditSubmit = () => {
//     axios.put(`http://127.0.0.1:8080/api/students/{id}}`, editStudent)
//       .then(response => {
//         setStudents(students.map(student => student.id === editStudent.id ? response.data : student));
//         setEditStudent(null);
//       })
//       .catch(error => {
//         console.error("There was an error updating the student!", error);
//       });
//   };

//   return (
//     <Paper style={{ padding: 20 }}>
//       <Typography variant="h4" gutterBottom>
//         Student Details
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Register Number</TableCell>
//             <TableCell>Course</TableCell>
//             <TableCell>Department</TableCell>
//             <TableCell>Year</TableCell>
//             <TableCell>Section</TableCell>
//             <TableCell>User ID</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {students.map((student) => (
//             <TableRow key={student.id}>
//               <TableCell>{student.id}</TableCell>
//               <TableCell>{student.registerNumber}</TableCell>
//               <TableCell>{student.course}</TableCell>
//               <TableCell>{student.department}</TableCell>
//               <TableCell>{student.year}</TableCell>
//               <TableCell>{student.section}</TableCell>
//               <TableCell>{student.user.id}</TableCell>
//               <TableCell>
//                 <Button variant="contained" color="primary" onClick={() => handleEditOpen(student)}>Edit</Button>
//                 <Button variant="contained" color="secondary" onClick={() => handleDelete(student.id)} style={{ marginLeft: 10 }}>Delete</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Edit Student Dialog */}
//       {editStudent && (
//         <Dialog open={true} onClose={handleEditClose}>
//           <DialogTitle>Edit Student</DialogTitle>
//           <DialogContent>
//             <TextField
//               margin="dense"
//               label="Register Number"
//               fullWidth
//               value={editStudent.registerNumber}
//               onChange={(e) => setEditStudent({ ...editStudent, registerNumber: e.target.value })}
//             />
//             <TextField
//               margin="dense"
//               label="Course"
//               fullWidth
//               value={editStudent.course}
//               onChange={(e) => setEditStudent({ ...editStudent, course: e.target.value })}
//             />
//             <TextField
//               margin="dense"
//               label="Department"
//               fullWidth
//               value={editStudent.department}
//               onChange={(e) => setEditStudent({ ...editStudent, department: e.target.value })}
//             />
//             <TextField
//               margin="dense"
//               label="Year"
//               fullWidth
//               value={editStudent.year}
//               onChange={(e) => setEditStudent({ ...editStudent, year: e.target.value })}
//             />
//             <TextField
//               margin="dense"
//               label="Section"
//               fullWidth
//               value={editStudent.section}
//               onChange={(e) => setEditStudent({ ...editStudent, section: e.target.value })}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleEditClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleEditSubmit} color="primary">
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Paper>
//   );
// };

// export default StudentDetails;
