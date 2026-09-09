/**
 * Journey Data
 *
 * Combined education and experience entries for a unified timeline.
 * Each entry has a `type` field: 'education' or 'work'.
 * Education entries may include courses and GPA.
 * Work entries may include highlights and technologies.
 *
 * Displayed in a horizontal timeline by js/components/experience.js.
 */

export const journey = [
    {
        id: 'edu-1',
        type: 'education',
        role: 'Bachelor of Geoinformatics Engineering (BEGE)',
        institution: 'National University of Sciences and Technology (NUST)',
        company: 'National University of Sciences and Technology (NUST)',
        location: 'Islamabad, Pakistan',
        startDate: 'September 2024',
        endDate: 'June 2028 (Expected)',
        description: 'Undergraduate program in geoinformatics engineering covering GIS, remote sensing, photogrammetry, geospatial programming, and engineering fundamentals.',
        courses: [
            'Remote Sensing',
            'GIS',
            'Photogrammetry',
            'Digital Mapping and Image Processing',
            'Geography',
            'Geosciences',
            'Soil Mechanics',
            'Engineering Surveying',
            'Architecture & Town Planning',
            'Engineering Drawing & Computer-Aided Design',
            'DSA',
            'OOP (C/C++)',
            'Probability & Statistics',
            'Linear Algebra',
            'Differential Equations',
            'Numerical Analysis (MATLAB)',
        ],
        gpa: '3.22/4.00',
        highlights: [],
        technologies: [],
    },
    {
        id: 'exp-2',
        type: 'work',
        role: 'GIS Intern',
        company: 'The Map Ventures',
        location: 'Islamabad, Pakistan',
        startDate: 'July 2026',
        endDate: 'August 2026',
        description: '',
        highlights: [
            'Digitized 2,300 cadastral Khasra plots using scanned cadastral maps, satellite imagery, QGIS, and ArcGIS, performing georeferencing, topology checks, attribute management, and KMZ verification',
            'Provided research support for a Quercus baloot decline study in Dasu, Kohistan, evaluating WorldView-2/3 and Sentinel-2 imagery and preparing candidate imagery batches for review',
            'Designed and developed the EDIP (Engro Distribution Intelligence Platform) prototype to optimize distribution routes, truck utilization, delivery time, and fuel costs using FastAPI, PostgreSQL, OR-Tools, and OpenStreetMap',
            'Produced five national-scale thematic maps for Pakistan (soil order, soil texture, soil organic matter, soil salinity, and LULC) in ArcMap, including raster classification, generalization, and legend/area joins',
            'Selected to continue as a GIS Developer following the internship',
        ],
        technologies: [],
        courses: [],
        gpa: '',
    },
    {
        id: 'exp-1',
        type: 'work',
        role: 'GIS Developer',
        company: 'The Map Ventures',
        location: 'Islamabad, Pakistan',
        startDate: 'September 2026',
        endDate: 'Present',
        description: 'Continuing geospatial software development and technical project work at The Map Ventures following the internship.',
        highlights: [],
        technologies: [],
        courses: [],
        gpa: '',
    },
];
