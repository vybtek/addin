const API_BASE_URL = "https://api.vybtek.com/api";

// Utility function to get auth token
const getToken = (setToast) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    setToast({
      type: "error",
      message: "Authentication token not found. Please login.",
    });
    return null;
  }
  return token;
};

// Get teacher ID from user ID
export const fetchTeacherIdByUserId = async (userId, setToast) => {
  const token = getToken(setToast);
  if (!token) return null;
  const res = await fetch(`${API_BASE_URL}/teachers/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok)
    throw new Error(`Failed to fetch teacher by user ID: ${res.status}`);
  const data = await res.json();
  return data.teacher_id;
};

// Fetch full teacher profile
export const fetchTeacherProfile = async (teacherId, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(
    `${API_BASE_URL}/teachers/getfullprofile/${teacherId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok)
    throw new Error(`Failed to fetch teacher profile: ${res.status}`);
  const response = await res.json();
  if (!response.success) throw new Error("Failed to fetch profile data");
  return response.data;
};

// Update teacher profile
export const updateTeacherProfile = async (teacherId, data, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(`${API_BASE_URL}/teachers/${teacherId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error(`Failed to update teacher profile: ${res.status}`);
  return await res.json();
};

// Teaching experience operations
export const addTeachingExperience = async (teacherId, data, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const payload = { ...data, teacher_id: teacherId };
  const res = await fetch(`${API_BASE_URL}/teacher-experiences/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error(`Failed to add teaching experience: ${res.status}`);
  return await res.json();
};

export const updateTeachingExperience = async (
  experienceId,
  data,
  setToast
) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(
    `${API_BASE_URL}/teacher-experiences/${experienceId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok)
    throw new Error(`Failed to update teaching experience: ${res.status}`);
  return await res.json();
};

export const deleteTeachingExperience = async (experienceId, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(
    `${API_BASE_URL}/teacher-experiences/${experienceId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok)
    throw new Error(`Failed to delete teaching experience: ${res.status}`);
  return true;
};

// Education operations
export const addEducation = async (teacherId, data, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const payload = { ...data, teacher_id: teacherId };
  const res = await fetch(`${API_BASE_URL}/teacher-educations/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to add education: ${res.status}`);
  return await res.json();
};

export const updateEducation = async (educationId, data, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(`${API_BASE_URL}/teacher-educations/${educationId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update education: ${res.status}`);
  return await res.json();
};

export const deleteEducation = async (educationId, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(`${API_BASE_URL}/teacher-educations/${educationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to delete education: ${res.status}`);
  return true;
};

// Awards operations
export const addAward = async (teacherId, data, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const payload = { ...data, teacher_id: teacherId };
  const res = await fetch(`${API_BASE_URL}/teacher-awards/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to add award: ${res.status}`);
  return await res.json();
};

export const updateAward = async (awardId, data, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(`${API_BASE_URL}/teacher-awards/${awardId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update award: ${res.status}`);
  return await res.json();
};

export const deleteAward = async (awardId, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(`${API_BASE_URL}/teacher-awards/${awardId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to delete award: ${res.status}`);
  return true;
};

// Subjects operations
export const fetchAvailableSubjects = async (setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(`${API_BASE_URL}/subjects/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok)
    throw new Error(`Failed to fetch available subjects: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const addTeacherSubject = async (teacherId, subjectId, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(`${API_BASE_URL}/teacher-subjects/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teacher_id: teacherId, subject_id: subjectId }),
  });
  if (!res.ok) throw new Error(`Failed to assign subject: ${res.status}`);
  return await res.json();
};

export const deleteTeacherSubject = async (assignmentId, setToast) => {
  const token = getToken(setToast);
  if (!token) throw new Error("Authentication token not found");
  const res = await fetch(`${API_BASE_URL}/teacher-subjects/${assignmentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to remove subject: ${res.status}`);
  return true;
};
