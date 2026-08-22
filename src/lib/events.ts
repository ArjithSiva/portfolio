// A tiny DOM CustomEvent bridge so distant components (Hero's "View Resume"
// button) can open the resume-preview modal that lives in the Resume
// section, without introducing a global state library for one interaction.
export const OPEN_RESUME_VIEWER_EVENT = 'open-resume-viewer'
