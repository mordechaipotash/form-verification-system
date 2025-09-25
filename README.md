# Form Verification System - PDF Processing Pipeline

**Production document verification platform** with AI-powered PDF data extraction, visual verification workflows, and automated applicant processing pipeline.

## 🎯 Overview

A sophisticated form verification system that processes uploaded PDFs through AI extraction, presents side-by-side verification interfaces (PDF viewer + extracted data), and manages applicant workflows through inbox/processing/verified stages.

## 📊 Production Features

- **AI-powered PDF extraction** with confidence scoring
- **Side-by-side verification** (PDF viewer + extracted data form)
- **Workflow management** (Inbox → Processing → Verified pipeline)
- **Real-time status updates** across verification stages
- **Multi-user collaboration** with conflict prevention
- **Bulk processing** capabilities for high-volume operations
- **Audit trail** tracking all verification actions

## 🏗️ Technical Architecture

### Processing Pipeline

```
PDF Upload → AI Extraction → Verification Queue → Human Review → Data Storage
     ↓              ↓                ↓                 ↓             ↓
 File Storage   OpenAI API     Inbox Dashboard    Side-by-Side   PostgreSQL
 (Supabase)   (GPT-4 Vision)   (React Table)      Verification   (Supabase)
```

### Core Tech Stack
- **Next.js 14** with Pages Router
- **TypeScript** for type-safe form handling
- **TanStack Query (React Query)** for server state management
- **React Hook Form** + Zod validation
- **PDF.js** (react-pdf-viewer) for document display
- **Tailwind CSS** + Headless UI for modern UI
- **Axios** for API communication
- **React Hot Toast** for user notifications

## ✨ Key Features

### 1. PDF Processing & Extraction
- **Drag-and-drop upload** with file validation
- **AI extraction** using GPT-4 Vision or similar OCR/extraction model
- **Confidence scoring** for extracted fields
- **Multiple document types** support (IRS forms, employment docs, etc.)
- **Batch upload** for high-volume processing

### 2. Side-by-Side Verification
- **Split-screen interface**: PDF viewer (left) + extracted data form (right)
- **Synchronized scrolling** to relevant form sections
- **Field highlighting** shows confidence levels (high/medium/low)
- **One-click corrections** for misread fields
- **Zoom controls** for PDF readability

### 3. Workflow Management
- **Inbox**: Newly uploaded forms awaiting verification
- **Processing**: Forms currently being verified by staff
- **Verified**: Completed forms ready for export/submission
- **Status indicators**: Visual badges for each workflow stage
- **Assignment system**: Prevent multiple users from verifying same form

### 4. Applicant Tracking
- **Centralized applicant database** with deduplication
- **Form history** tracking all submissions per applicant
- **Cross-reference validation** checks for data consistency
- **Bulk export** to CSV/Excel for downstream systems

## 🚀 Setup & Deployment

### Prerequisites
- Node.js ≥20.0.0
- Supabase project configured
- OpenAI API key (or alternative extraction service)

### Installation

```bash
# Clone repository
git clone https://github.com/mordechaipotash/form-verification-system.git
cd form-verification-system

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Add credentials to .env.local

# Run development server
npm run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# AI Extraction (OpenAI or alternative)
OPENAI_API_KEY=sk-your-key
EXTRACTION_MODEL=gpt-4-vision-preview

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Schema

```sql
-- Form submissions with AI extraction results
CREATE TABLE form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- File & Upload Info
  pdf_url TEXT NOT NULL,
  pdf_storage_path TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_size_bytes INTEGER,
  upload_timestamp TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id),
  
  -- AI Extraction Results
  extracted_data JSONB NOT NULL,
  extraction_confidence JSONB,  -- Per-field confidence scores
  extraction_model TEXT DEFAULT 'gpt-4-vision',
  extraction_timestamp TIMESTAMPTZ,
  
  -- Workflow Status
  status TEXT DEFAULT 'inbox' CHECK (status IN ('inbox', 'processing', 'verified', 'rejected')),
  assigned_to UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  
  -- Verification Details
  corrections JSONB DEFAULT '[]'::JSONB,  -- Track field corrections
  verification_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applicant data (deduplicated)
CREATE TABLE applicants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  ssn TEXT UNIQUE,
  
  -- Contact
  phone TEXT,
  email TEXT,
  address TEXT,
  
  -- Form References
  form_submission_ids UUID[] DEFAULT ARRAY[]::UUID[],
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
```

## 📱 User Interface

### Dashboard Views

**Inbox** (`/inbox`):
- Grid/list view of unprocessed forms
- Filter by upload date, filename, uploader
- Quick preview and assignment

**Processing** (`/processing`):
- Active verifications in progress
- Assignment tracking (who's working on what)
- Time spent per form

**Verified** (`/verified`):
- Completed forms ready for export
- Bulk export capabilities
- Archive functionality

### Verification Interface

**Split-Screen Layout**:
```
┌─────────────────────┬─────────────────────┐
│   PDF Viewer        │  Extracted Form     │
│   (react-pdf)       │  (React Hook Form)  │
│                     │                     │
│  - Zoom controls    │  - Auto-populated   │
│  - Page navigation  │  - Confidence flags │
│  - Highlight mode   │  - Correction mode  │
└─────────────────────┴─────────────────────┘
```

## 🎓 Technical Highlights

### AI Integration
- **GPT-4 Vision API** for intelligent form field extraction
- **Confidence scoring** per field for verification prioritization
- **Fallback OCR** for cases where AI extraction fails
- **Schema validation** with Zod ensures extracted data structure

### Performance Optimization
- **TanStack Query** caching reduces redundant API calls
- **PDF.js worker** offloads rendering to background thread
- **Lazy loading** for large PDF files
- **Optimistic updates** for instant UI feedback during verification

### State Management
- **React Query** for server state (forms, applicants)
- **React Hook Form** for local form state
- **URL state** for filters and pagination
- **LocalStorage** for user preferences

## 💼 Use Cases

- **HR Departments**: Digitize paper employment applications
- **Government Agencies**: Process benefit applications and tax forms
- **Healthcare**: Verify patient intake forms and insurance docs
- **Legal Services**: Process client intake documents
- **Financial Services**: KYC (Know Your Customer) document verification

## 🌟 Innovation Showcase

**Why This Project Stands Out**:
- **AI + Human workflow**: Combines automation with human verification
- **Side-by-side UX**: Novel verification interface reduces errors
- **Production pipeline**: Complete inbox → processing → verified workflow
- **PDF.js integration**: Custom viewer with extraction highlighting
- **Multi-stage workflow**: Demonstrates understanding of business process automation

**Recruiter Signals**:
- AI/ML integration for document processing (GPT-4 Vision)
- Complex workflow management with state machines
- PDF handling and rendering in web applications
- Full-stack TypeScript with modern React patterns
- Production-ready business application development

---

**Built by Mordechai Potash** | [Portfolio](https://github.com/mordechaipotash) | Document verification automation