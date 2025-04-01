from dotenv import load_dotenv
import base64
import streamlit as st
import os
import io
from PIL import Image
import pdf2image
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to get response from Gemini
def get_gemini_response(input_text, pdf_content, prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([input_text, pdf_content[0], prompt])
    return response.text

# Function to process PDF and convert it to an image
def input_pdf_setup(uploaded_file):
    if uploaded_file is not None:
        try:
            # Convert PDF to images (first page only)
            images = pdf2image.convert_from_bytes(
                uploaded_file.read(),
                poppler_path=r"C:\poppler-24.08.0\Library\bin" # Ensure this is the correct path
            )

            first_page = images[0]

            # Convert image to bytes
            img_byte_arr = io.BytesIO()
            first_page.save(img_byte_arr, format='JPEG')
            img_byte_arr = img_byte_arr.getvalue()

            # Prepare for API
            pdf_parts = [
                {
                    "mime_type": "image/jpeg",
                    "data": base64.b64encode(img_byte_arr).decode()  # Encode to base64
                }
            ]
            return pdf_parts
        except Exception as e:
            st.error(f"Error processing PDF: {e}")
            return None
    else:
        st.error("No file uploaded")
        return None

# Streamlit UI
st.set_page_config(page_title="ATS Resume Expert")
st.header("ATS Tracking System")

# Input Fields
input_text = st.text_area("Job Description:", key="input")
uploaded_file = st.file_uploader("Upload your resume (PDF)...", type=["pdf"])

if uploaded_file is not None:
    st.write("✅ PDF Uploaded Successfully")

# Buttons
submit1 = st.button("Tell Me About the Resume")
submit3 = st.button("Percentage Match")

# Prompts
input_prompt1 = """
You are an experienced Technical Human Resource Manager. Your task is to review the provided resume against the job description. 
Please share your professional evaluation on whether the candidate's profile aligns with the role. 
Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
"""

input_prompt3 = """
You are a skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality. 
Your task is to evaluate the resume against the provided job description. Give me the percentage of match if the resume matches
the job description. First, the output should come as a percentage, then missing keywords, and finally, final thoughts.
"""

# Handle Button Clicks
if submit1:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        if pdf_content:
            response = get_gemini_response(input_prompt1, pdf_content, input_text)
            st.subheader("Response:")
            st.write(response)
    else:
        st.error("⚠️ Please upload a resume.")

elif submit3:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        if pdf_content:
            response = get_gemini_response(input_prompt3, pdf_content, input_text)
            st.subheader("Response:")
            st.write(response)
    else:
        st.error("⚠️ Please upload a resume.")
