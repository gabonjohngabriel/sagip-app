import React, { useState } from "react";
import {
  Fade,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Box,
  Container,
  Divider,
  Switch,
  FormControlLabel,
  Card,
  CardHeader,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useStyles from "./Styles";
import Logo from "./Logo";
import SagipLogoAnimation from "./SagipLogoAnimation";

const AppointmentForm = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // INFO
    isNewPatient: false,
    patientId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    insuranceProvider: "",
    insuranceNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",

    // DETAILS
    date: null,
    time: null,
    doctorId: "",
    appointmentType: "",
    reason: "",
    notes: "",
    followUp: false,

    // HISTORY
    medications: "",
    allergies: "",
    medicalConditions: "",
    familyHistory: "",

    // CONSENT FORM
    consentToTreatment: false,
    privacyPolicy: false,
  });

  // HANDLE
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        name.includes("is") ||
        name.includes("followUp") ||
        name.includes("consent") ||
        name.includes("privacy")
          ? checked
          : value,
    });
  };

  const handleDateChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // DOCTORS LIST
  const doctors = [
    {
      id: 0,
      name: "Dr. Marc Graven Cortez",
      description:
        "A Medical Practitioner from Control North, San Jose, San Simon, Pampanga.",
      img: "./images/graven.png",
      specialty: "General Medicine",
      education: "University of the Philippines Manila",
      experience: "15 years",
      availability: ["Monday", "Wednesday", "Friday"],
      contact: "+63 912 345 6789",
    },
    {
      id: 1,
      name: "Dr. Anna Marielle Pineda",
      description:
        "A Medical Practitioner from San Isidro, San Simon, Pampanga.",
      img: "./images/anna.png",
      specialty: "Pediatrics",
      education: "University of Santo Tomas",
      experience: "8 years",
      availability: ["Tuesday", "Thursday", "Saturday"],
      contact: "+63 923 456 7890",
    },
    {
      id: 2,
      name: "Dr. David Kyle Mallari",
      description:
        "The Best Medical Practitioner who can speak English straight.",
      img: "${process.env.PUBLIC_URL}/images/david.png",
      specialty: "Internal Medicine",
      education: "Ateneo School of Medicine",
      experience: "12 years",
      availability: ["Monday", "Tuesday", "Friday"],
      contact: "+63 934 567 8901",
    },
    {
      id: 3,
      name: "Dr. Emmanuel Villafuerte",
      description: "A Medical Practitioner from San Pedro, San Simon, Pampanga",
      img: "${process.env.PUBLIC_URL}/images/emman.png",
      specialty: "Cardiology",
      education: "Manila Central University",
      experience: "10 years",
      availability: ["Wednesday", "Thursday", "Saturday"],
      contact: "+63 945 678 9012",
    },
    {
      id: 4,
      name: "Dr. Christelle Ashley Santos",
      description: "A Medical Practitioner from Apalit, Pampanga",
      img: "${process.env.PUBLIC_URL}/images/ash.png",
      specialty: "Dermatology",
      education: "De La Salle Health Sciences Institute",
      experience: "6 years",
      availability: ["Monday", "Wednesday", "Saturday"],
      contact: "+63 956 789 0123",
    },
    {
      id: 5,
      name: "Dr. Royce Anthony Collado",
      description: "A Medical Practitioner from Apalit, Pampanga",
      img: "${process.env.PUBLIC_URL}/images/ash.png",
      specialty: "Surgeon",
      education: "University of Santo Tomas",
      experience: "6 years",
      availability: ["Monday", "Wednesday", "Saturday"],
      contact: "+63 956 789 0123",
    },
    {
      id: 6,
      name: "Dr. John Gabriel Gabon",
      description: "A Medical Practitioner from San Jose, San Simon, Pampanga",
      img: "${process.env.PUBLIC_URL}/images/emman.png",
      specialty: "Cardiologist",
      education: "Ateneo School of Medicine",
      experience: "10 years",
      availability: ["Wednesday", "Thursday", "Saturday"],
      contact: "+63 945 678 9012",
    },
    {
      id: 7,
      name: "Dr. Bernard Jet Bautista",
      description: "A Medical Practitioner from San Simon, Pampanga",
      img: "${process.env.PUBLIC_URL}/images/emman.png",
      specialty: "Dietitian",
      education: "University of the Philippines Diliman",
      experience: "10 years",
      availability: ["Wednesday", "Thursday", "Saturday"],
      contact: "+63 945 678 9012",
    },
  ];

  // TYPES
  const appointmentTypes = [
    "Initial Consultation",
    "Follow-up",
    "Annual Physical",
    "Urgent Care",
    "Vaccination",
    "Lab Work",
    "Specialist Referral",
  ];

  // FORM
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    alert("Appointment successfully scheduled!");
    setFormData({
      isNewPatient: false,
      patientId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      gender: "",
      phoneNumber: "",
      email: "",
      address: "",
      insuranceProvider: "",
      insuranceNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      date: null,
      time: null,
      doctorId: "",
      appointmentType: "",
      reason: "",
      notes: "",
      followUp: false,
      medications: "",
      allergies: "",
      medicalConditions: "",
      familyHistory: "",
      consentToTreatment: false,
      privacyPolicy: false,
    });
  };

  // RESET
  const resetForm = () => {
    setFormData({
      isNewPatient: false,
      patientId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      gender: "",
      phoneNumber: "",
      email: "",
      address: "",
      insuranceProvider: "",
      insuranceNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      date: null,
      time: null,
      doctorId: "",
      appointmentType: "",
      reason: "",
      notes: "",
      followUp: false,
      medications: "",
      allergies: "",
      medicalConditions: "",
      familyHistory: "",
      consentToTreatment: false,
      privacyPolicy: false,
    });
  };

  const [showPage, setShowPage] = useState(false);

  const handleAnimationComplete = () => {
    setShowPage(true);
  };

  // ANIMATION
  if (!showPage) {
    return <SagipLogoAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className={`${styles.root} ${styles.center2} ${styles.green}`}>
        <Fade in={true} timeout={1000}>
          <Container
            className={`${styles.cardsContainer}`}
            maxWidth="lg"
            sx={{ py: 4 }}
          >
            <Box
              my={"25px"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Logo large />
              <Typography
                variant="h6"
                className={`${styles.poppins} ${styles.center}`}
              >
                SAGIP APP
              </Typography>
              <Typography
                variant="h4"
                className={`${styles.poppins} ${styles.center} ${styles.bold}`}
                sx={{ mt: 2 }}
              >
                PATIENT APPOINTMENT
              </Typography>
            </Box>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <form onSubmit={handleSubmit}>
                {/* Patient Information Section */}
                <Card sx={{ mb: 4, overflow: "visible" }}>
                  <Typography
                    className={`${styles.poppins} ${styles.green} ${styles.sectionHeader} ${styles.bold}`}
                    titleTypographyProps={{ variant: "h6" }}
                    sx={{ p: 2 }}
                  >
                    Patient Information
                  </Typography>

                  <Box sx={{ p: 3 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isNewPatient}
                          onChange={handleChange}
                          name="isNewPatient"
                          color="primary"
                        />
                      }
                      label="New Patient"
                      className={styles.poppins}
                    />

                    {!formData.isNewPatient && (
                      <TextField
                        fullWidth
                        label="Patient ID"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        helperText="Enter existing patient ID to load information"
                        className={styles.poppins}
                      />
                    )}

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          margin="normal"
                          variant="outlined"
                          className={styles.poppins}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          margin="normal"
                          variant="outlined"
                          className={styles.poppins}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          label="Date of Birth"
                          value={
                            formData.dateOfBirth
                              ? dayjs(formData.dateOfBirth)
                              : null
                          }
                          onChange={(newValue) =>
                            handleDateChange(
                              "dateOfBirth",
                              newValue ? newValue.toDate() : null
                            )
                          }
                          sx={{ mt: 2, width: 370 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              fullWidth
                              margin="normal"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        >
                          <InputLabel>Gender</InputLabel>
                          <Select
                            value={formData.gender}
                            onChange={handleChange}
                            label="Gender"
                            name="gender"
                            required
                            className={styles.poppins}
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                            <MenuItem value="prefer-not-to-say">
                              Prefer not to say
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Phone Number"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          margin="normal"
                          variant="outlined"
                          className={styles.poppins}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          margin="normal"
                          variant="outlined"
                          className={styles.poppins}
                        />
                      </Grid>
                    </Grid>

                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={2}
                      className={styles.poppins}
                    />

                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      className={`${styles.poppins} ${styles.bold}`}
                      sx={{ mt: 2 }}
                    >
                      Insurance Information
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Insurance Provider"
                          name="insuranceProvider"
                          value={formData.insuranceProvider}
                          onChange={handleChange}
                          margin="normal"
                          variant="outlined"
                          className={styles.poppins}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Insurance Number"
                          name="insuranceNumber"
                          value={formData.insuranceNumber}
                          onChange={handleChange}
                          margin="normal"
                          variant="outlined"
                          className={styles.poppins}
                        />
                      </Grid>
                    </Grid>

                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      className={`${styles.poppins} ${styles.bold}`}
                      sx={{ mt: 2 }}
                    >
                      Emergency Contact
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Contact Name"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleChange}
                          margin="normal"
                          variant="outlined"
                          className={styles.poppins}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Contact Phone"
                          name="emergencyContactPhone"
                          value={formData.emergencyContactPhone}
                          onChange={handleChange}
                          margin="normal"
                          variant="outlined"
                          className={styles.poppins}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Card>

                {/* APPOINTMENT DETAILS */}
                <Card sx={{ mb: 3, overflow: "visible" }}>
                  <Typography
                    title="Appointment Details"
                    className={`${styles.poppins} ${styles.green} ${styles.sectionHeader} ${styles.bold}`}
                    sx={{ backgroundColor: "#f9f9f9", p: 2 }}
                  >
                    Appointment Details
                  </Typography>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          label="Appointment Date"
                          value={formData.date ? dayjs(formData.date) : null}
                          onChange={(newValue) =>
                            handleDateChange(
                              "date",
                              newValue ? newValue.toDate() : null
                            )
                          }
                          sx={{ width: 370 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              className={styles.poppins}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TimePicker
                          label="Appointment Time"
                          value={formData.time ? dayjs(formData.time) : null}
                          onChange={(newValue) =>
                            handleDateChange(
                              "time",
                              newValue ? newValue.toDate() : null
                            )
                          }
                          sx={{ width: 370 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              className={styles.poppins}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel>Medical Professional</InputLabel>
                      <Select
                        value={formData.doctorId}
                        onChange={handleChange}
                        label="Medical Professional"
                        name="doctorId"
                        required
                        className={styles.poppins}
                      >
                        {doctors.map((doctor) => (
                          <MenuItem key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel>Appointment Type</InputLabel>
                      <Select
                        value={formData.appointmentType}
                        onChange={handleChange}
                        label="Appointment Type"
                        name="appointmentType"
                        required
                        className={styles.poppins}
                      >
                        {appointmentTypes.map((type) => (
                          <MenuItem
                            key={type}
                            value={type}
                            className={styles.poppins}
                          >
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      required
                      label="Reason for Visit"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={3}
                      className={styles.poppins}
                    />

                    <TextField
                      fullWidth
                      label="Additional Notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={3}
                      className={styles.poppins}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.followUp}
                          onChange={handleChange}
                          name="followUp"
                          color="primary"
                        />
                      }
                      label="Schedule Follow-up Appointment"
                      className={styles.poppins}
                    />
                  </Box>
                </Card>
                {/* Medical History Section - Only for new patients */}
                {formData.isNewPatient && (
                  <Card sx={{ mb: 3 }}>
                    <CardHeader
                      title="Medical History"
                      className={`${styles.poppins} ${styles.bold}`}
                      titleTypographyProps={{ variant: "h6" }}
                      sx={{ backgroundColor: "#f9f9f9", pb: 1 }}
                    />
                    <Box sx={{ p: 3 }}>
                      <TextField
                        fullWidth
                        label="Current Medications"
                        name="medications"
                        value={formData.medications}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={2}
                        className={styles.poppins}
                      />

                      <TextField
                        fullWidth
                        label="Allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={2}
                        className={styles.poppins}
                      />

                      <TextField
                        fullWidth
                        label="Medical Conditions"
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={2}
                        className={styles.poppins}
                      />

                      <TextField
                        fullWidth
                        label="Family Medical History"
                        name="familyHistory"
                        value={formData.familyHistory}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={2}
                        className={styles.poppins}
                      />
                    </Box>
                  </Card>
                )}

                {/* Consent Section */}
                <Card sx={{ mb: 3 }}>
                  <CardHeader
                    title="Consent and Agreements"
                    className={`${styles.poppins} ${styles.bold}`}
                    titleTypographyProps={{ variant: "h6" }}
                    sx={{ backgroundColor: "#f9f9f9", pb: 1 }}
                  />
                  <Box sx={{ p: 3 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          required
                          checked={formData.consentToTreatment}
                          onChange={handleChange}
                          name="consentToTreatment"
                          color="primary"
                        />
                      }
                      label="I consent to treatment and understand the risks involved"
                      className={styles.poppins}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          required
                          checked={formData.privacyPolicy}
                          onChange={handleChange}
                          name="privacyPolicy"
                          color="primary"
                        />
                      }
                      label="I have read and agree to the privacy policy"
                      className={styles.poppins}
                    />
                  </Box>
                </Card>

                {/* BUTTONS */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <Button
                    color="secondary"
                    onClick={resetForm}
                    className={`${styles.green} ${styles.cardsContainer} ${styles.cardhover} ${styles.poppins}`}
                  >
                    Reset Form
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={`${styles.green} ${styles.cardsContainer} ${styles.cardhover} ${styles.bold} ${styles.poppins}`}
                  >
                    Schedule Appointment
                  </Button>
                </Box>
              </form>
            </Paper>
          </Container>
        </Fade>
      </Box>
    </LocalizationProvider>
  );
};

export default AppointmentForm;
