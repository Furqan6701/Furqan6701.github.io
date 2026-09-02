/**
 * Skills Data
 *
 * 6 domain-grouped technology categories with detail info.
 * Each technology has: name, proficiency (1-5), label, description, uses[], and related projects.
 *
 * Domains: GIS & Remote Sensing, Photogrammetry, Programming, Computer Vision, Web & Backend, Other Skills.
 */

export const domains = [
    {
        id: 'gis-remote-sensing',
        title: 'GIS & Remote Sensing',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>`,
        technologies: [
            {
                name: 'QGIS',
                proficiency: 5,
                label: 'Expert',
                description: 'Primary GIS desktop application for spatial analysis, georeferencing, cadastral digitization, and map production.',
                uses: [
                    'Cadastral digitization and topology validation',
                    'Georeferencing scanned maps to satellite imagery',
                    'Raster and vector spatial analysis workflows',
                ],
                projects: [
                    { id: 'cadastral-digitization', name: 'Cadastral Digitization', line: '2,300 Khasra plot digitization' },
                    { id: 'photogrammetry-drone', name: 'Photogrammetry & Drone Mapping', line: 'Stereo imagery processing' },
                ],
            },
            {
                name: 'ArcGIS Pro',
                proficiency: 4,
                label: 'Advanced',
                description: 'Enterprise GIS platform for advanced spatial analysis, geoprocessing, and 3D visualization.',
                uses: [
                    'Advanced geoprocessing models and analysis',
                    '3D scene visualization and terrain modeling',
                    'Enterprise geodatabase management',
                ],
                projects: [
                    { id: 'cadastral-digitization', name: 'Cadastral Digitization', line: 'KMZ verification and attribute management' },
                ],
            },
            {
                name: 'ArcMap',
                proficiency: 4,
                label: 'Advanced',
                description: 'Desktop GIS application for cartography, spatial data management, and map production.',
                uses: [
                    'Thematic map production and layout design',
                    'Spatial data editing and topology management',
                    'Geodatabase creation and editing',
                ],
                projects: [
                    { id: 'cadastral-digitization', name: 'Cadastral Digitization', line: '2,300 Khasra plot digitization' },
                    { id: 'pakistan-soil-series', name: 'Pakistan Soil Mapping Series', line: 'Five thematic soil & land-use maps' },
                    { id: 'rice-crop-mapping', name: 'Rice Crop Mapping and Change Detection', line: 'Crop identification from satellite imagery' },
                    { id: 'flood-mapping-swat', name: 'Flood Mapping with Sentinel-2 & MNDWI', line: 'Flood extent mapping with MNDWI' },
                    { id: 'urban-lulc-lahore', name: 'Urban LULC Mapping', line: 'Land use & infrastructure mapping' },
                    { id: 'imperial-county', name: 'Imperial County California – Surface Analysis', line: 'Surface analysis & terrain modeling' },
                ],
            },
            {
                name: 'ERDAS Imagine',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Commercial remote sensing software for image processing, spectral analysis, and land cover classification.',
                uses: [
                    'Spectral band analysis and index computation',
                    'Supervised and unsupervised classification',
                    'Change detection and temporal analysis',
                ],
                projects: [
                    { id: 'rice-crop-mapping', name: 'Rice Crop Mapping and Change Detection', line: 'Crop identification from satellite imagery' },
                    { id: 'flood-mapping-swat', name: 'Flood Mapping with Sentinel-2 & MNDWI', line: 'Flood extent mapping with MNDWI' },
                ],
            },
            {
                name: 'Sentinel-2 API',
                proficiency: 4,
                label: 'Advanced',
                description: 'ESA\'s Copernicus Open Access API for retrieving Sentinel-2 multispectral satellite imagery and geospatial data products.',
                uses: [
                    'Sentinel-2 multispectral imagery retrieval',
                    'Date-range and cloud-cover filtering',
                    'Automated data download for analysis pipelines',
                ],
                projects: [
                    { id: 'geocluster-2', name: 'GEOCLUSTER 2.0', line: 'Sentinel-2 imagery retrieval' },
                ],
            },
            {
                name: 'Geodatabase Design',
                proficiency: 4,
                label: 'Advanced',
                description: 'Designing and managing geospatial database schemas for efficient spatial data storage and querying.',
                uses: [
                    'Spatial data model design (vector/raster)',
                    'Topology rule configuration',
                    'Attribute schema and relationship class design',
                ],
                projects: [
                    { id: 'cadastral-digitization', name: 'Cadastral Digitization', line: 'Attribute management & topology' },
                    { id: 'edip', name: 'EDIP', line: 'Spatial data storage & route queries' },
                ],
            },
            {
                name: 'Spectral Analysis',
                proficiency: 4,
                label: 'Advanced',
                description: 'Techniques for analyzing spectral bands and indices from multispectral satellite imagery to identify land cover and detect changes.',
                uses: [
                    'Band ratio computation (NDVI, MNDWI, etc.)',
                    'Spectral profile analysis for crop identification',
                    'Change detection across temporal image stacks',
                ],
                projects: [
                    { id: 'quercus-baloot', name: 'Quercus Baloot Decline Study — Dasu, Kohistan', line: 'Spectral & spatial imagery evaluation' },
                    { id: 'rice-crop-mapping', name: 'Rice Crop Mapping and Change Detection', line: 'Spectral crop identification' },
                    { id: 'flood-mapping-swat', name: 'Flood Mapping with Sentinel-2 & MNDWI', line: 'MNDWI-based flood extent' },
                ],
            },
            {
                name: 'DEM Analysis',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Digital Elevation Model processing for terrain visualization, slope/aspect analysis, and surface modeling.',
                uses: [
                    'Terrain surface generation from elevation data',
                    'Slope, aspect, and hillshade computation',
                    '3D terrain visualization and contour extraction',
                ],
                projects: [
                    { id: 'imperial-county', name: 'Imperial County, California — Surface Analysis', line: 'Surface analysis & terrain modeling' },
                ],
            },
        ],
    },
    {
        id: 'photogrammetry',
        title: 'Photogrammetry',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
        technologies: [
            {
                name: 'Drone Mapping',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Processing drone-captured imagery for orthomosaics, digital elevation models, and 3D terrain reconstruction.',
                uses: [
                    'Orthorectification of aerial imagery',
                    'Digital elevation model generation',
                    'Stereo mosaic creation from overlapping images',
                ],
                projects: [
                    { id: 'photogrammetry-drone', name: 'Photogrammetry & Drone Mapping', line: '~100-image stereo mosaic' },
                ],
            },
            {
                name: 'GDAL',
                proficiency: 4,
                label: 'Advanced',
                description: 'Geospatial Data Abstraction Library for reading, writing, and transforming raster/vector geospatial data formats.',
                uses: [
                    'Format conversion between raster and vector data',
                    'Raster reprojection and mosaicking',
                    'Command-line geospatial data processing',
                ],
                projects: [
                    { id: 'photogrammetry-drone', name: 'Photogrammetry & Drone Mapping', line: 'Raster format conversion & reprojection' },
                ],
            },
            {
                name: 'Orfeo Toolbox',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Open-source remote sensing image processing toolbox for high-resolution optical and radar data.',
                uses: [
                    'Image segmentation and classification',
                    'Feature extraction from satellite imagery',
                    'Pan-sharpening and image fusion',
                ],
                projects: [
                    { id: 'photogrammetry-drone', name: 'Photogrammetry & Drone Mapping', line: 'Image processing for orthorectification' },
                ],
            },
            {
                name: 'GIMP',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Image editing software used for preprocessing and enhancing satellite and drone imagery.',
                uses: [
                    'Image enhancement and contrast adjustment',
                    'Band compositing and false-color rendering',
                    'Annotation and visual output preparation',
                ],
                projects: [
                    { id: 'photogrammetry-drone', name: 'Photogrammetry & Drone Mapping', line: 'Imagery preprocessing & enhancement' },
                ],
            },
            {
                name: 'ExifTool',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Metadata reader/writer for images, used to extract and manage EXIF/GPS data from drone and camera imagery.',
                uses: [
                    'Reading GPS coordinates from drone imagery',
                    'Batch metadata extraction and validation',
                    'Metadata cleanup for photogrammetry workflows',
                ],
                projects: [
                    { id: 'photogrammetry-drone', name: 'Photogrammetry & Drone Mapping', line: 'EXIF/GPS metadata extraction' },
                ],
            },
            {
                name: 'Orthorectification',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Correcting aerial and satellite imagery for terrain displacement and sensor tilt to produce geometrically accurate maps.',
                uses: [
                    'Terrain-corrected orthomosaic generation',
                    'Geometric accuracy improvement for drone imagery',
                    'DEM-based image rectification',
                ],
                projects: [
                    { id: 'photogrammetry-drone', name: 'Photogrammetry & Drone Mapping', line: 'Orthorectification of aerial imagery' },
                ],
            },
        ],
    },
    {
        id: 'programming',
        title: 'Programming',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
        technologies: [
            {
                name: 'Python',
                proficiency: 5,
                label: 'Expert',
                description: 'Primary language for geospatial automation, web backends, data analysis, and desktop application development.',
                uses: [
                    'Geospatial scripting and automation with GDAL/rasterio',
                    'Web API development with FastAPI',
                    'Desktop GUI applications with PyQt5',
                ],
                projects: [
                    { id: 'geocluster-2', name: 'GEOCLUSTER 2.0', line: 'Full-stack geospatial image analysis' },
                    { id: 'edip', name: 'EDIP', line: 'Backend API & routing engine' },
                ],
            },
            {
                name: 'C++',
                proficiency: 4,
                label: 'Advanced',
                description: 'Systems programming language used for performance-critical applications and object-oriented design.',
                uses: [
                    'Object-oriented application architecture',
                    'Algorithm implementation and data structures',
                    'Performance-critical computational tasks',
                ],
                projects: [
                    { id: 'car-rental-system', name: 'Car Rental Management System', line: 'OOP design & implementation' },
                ],
            },
            {
                name: 'C',
                proficiency: 4,
                label: 'Advanced',
                description: 'Low-level programming language for systems programming, embedded applications, and understanding core computing.',
                uses: [
                    'Memory management and pointer arithmetic',
                    'Systems-level programming fundamentals',
                    'Algorithm implementation with manual optimization',
                ],
                projects: [],
            },
            {
                name: 'Lua (TIC-80)',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Lightweight scripting language used for game development and embedded scripting.',
                uses: [
                    'Game logic and behavior scripting',
                    'TIC-80 fantasy console development',
                    'Embedded scripting in applications',
                ],
                projects: [
                    { id: 'pandas-quest', name: "Panda's Quest", line: '2D platformer for TIC-80' },
                ],
            },
            {
                name: 'MATLAB',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Numerical computing environment for mathematical analysis, data visualization, and algorithm prototyping.',
                uses: [
                    'Numerical analysis and matrix computation',
                    'Signal and image processing prototyping',
                    'Data visualization and plotting',
                ],
                projects: [],
            },
        ],
    },
    {
        id: 'computer-vision',
        title: 'Computer Vision',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
        technologies: [
            {
                name: 'OpenCV',
                proficiency: 4,
                label: 'Advanced',
                description: 'Open-source computer vision library for image processing, feature detection, and spatial analysis.',
                uses: [
                    'Image segmentation and object detection',
                    'Feature matching and image registration',
                    'Real-time image processing pipelines',
                ],
                projects: [
                    { id: 'geocluster-2', name: 'GEOCLUSTER 2.0', line: 'Image analysis & clustering pipeline' },
                ],
            },
            {
                name: 'NumPy',
                proficiency: 4,
                label: 'Advanced',
                description: 'Fundamental Python library for numerical computation, array operations, and scientific computing.',
                uses: [
                    'Multi-dimensional array operations on raster data',
                    'Statistical analysis and mathematical transforms',
                    'Efficient data manipulation for geospatial workflows',
                ],
                projects: [
                    { id: 'geocluster-2', name: 'GEOCLUSTER 2.0', line: 'Raster data computation & clustering' },
                ],
            },
            {
                name: 'Matplotlib',
                proficiency: 4,
                label: 'Advanced',
                description: 'Python plotting library for creating static, animated, and interactive visualizations.',
                uses: [
                    'Histogram generation and data visualization',
                    'Spectral profile plotting',
                    'Publication-quality scientific figures',
                ],
                projects: [
                    { id: 'geocluster-2', name: 'GEOCLUSTER 2.0', line: 'Histogram & visualization generation' },
                ],
            },
            {
                name: 'PyQt5',
                proficiency: 4,
                label: 'Advanced',
                description: 'Python bindings for Qt framework, used to build cross-platform desktop GUI applications.',
                uses: [
                    'Desktop application interface design',
                    'Custom widget creation for data visualization',
                    'Event-driven application architecture',
                ],
                projects: [
                    { id: 'geocluster-2', name: 'GEOCLUSTER 2.0', line: 'Desktop GUI for image analysis' },
                ],
            },
            {
                name: 'K-Means Clustering',
                proficiency: 4,
                label: 'Advanced',
                description: 'Unsupervised machine learning algorithm for grouping spatial and spectral data into distinct clusters.',
                uses: [
                    'Unsupervised land cover classification',
                    'Spectral band clustering for image segmentation',
                    'Pattern discovery in geospatial datasets',
                ],
                projects: [
                    { id: 'geocluster-2', name: 'GEOCLUSTER 2.0', line: 'K-Means clustering pipeline' },
                ],
            },
        ],
    },
    {
        id: 'web-backend',
        title: 'Web & Backend',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        technologies: [
            {
                name: 'FastAPI',
                proficiency: 4,
                label: 'Advanced',
                description: 'Modern Python web framework for building high-performance REST APIs with automatic documentation.',
                uses: [
                    'RESTful API design and implementation',
                    'Asynchronous request handling',
                    'Auto-generated OpenAPI documentation',
                ],
                projects: [
                    { id: 'edip', name: 'EDIP', line: 'Distribution intelligence API backend' },
                ],
            },
            {
                name: 'OpenStreetMap',
                proficiency: 4,
                label: 'Advanced',
                description: 'Open-source collaborative mapping platform providing free geospatial data for routing, geocoding, and analysis.',
                uses: [
                    'Road network data for routing and optimization',
                    'Geocoding and address lookup',
                    'Base map data for GIS visualization',
                ],
                projects: [
                    { id: 'edip', name: 'EDIP', line: 'Routing network & road data' },
                ],
            },
            {
                name: 'PostgreSQL',
                proficiency: 4,
                label: 'Advanced',
                description: 'Advanced relational database with PostGIS extension for geospatial data storage and querying.',
                uses: [
                    'Geospatial data storage with PostGIS',
                    'Complex spatial queries and joins',
                    'Database design for geospatial applications',
                ],
                projects: [
                    { id: 'edip', name: 'EDIP', line: 'Spatial data storage & route queries' },
                ],
            },
            {
                name: 'OR-Tools',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Google\'s operations research toolkit for combinatorial optimization and constraint programming.',
                uses: [
                    'Vehicle routing problem (VRP) solving',
                    'Resource allocation and scheduling optimization',
                    'Constraint-based logistics modeling',
                ],
                projects: [
                    { id: 'edip', name: 'EDIP', line: 'Route optimization & truck utilization' },
                ],
            },
            {
                name: 'React',
                proficiency: 3,
                label: 'Intermediate',
                description: 'JavaScript library for building modern, component-based user interfaces.',
                uses: [
                    'Component-based UI architecture',
                    'State management for interactive dashboards',
                    'Responsive single-page applications',
                ],
                projects: [
                    { id: 'edip', name: 'EDIP', line: 'Distribution intelligence frontend' },
                ],
            },
            {
                name: 'Tailwind CSS',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Utility-first CSS framework for rapid UI development with consistent design tokens.',
                uses: [
                    'Rapid prototyping with utility classes',
                    'Responsive design without custom CSS',
                    'Consistent spacing and typography scales',
                ],
                projects: [
                    { id: 'edip', name: 'EDIP', line: 'Utility-first styling framework' },
                ],
            },
            {
                name: 'GPT-OSS-20B API',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Open-source GPT model integrated for natural-language command routing and AI-assisted geospatial workflows.',
                uses: [
                    'Natural-language function control and command routing',
                    'AI-assisted image analysis descriptions',
                    'Conversational interface for geospatial tools',
                ],
                projects: [
                    { id: 'geocluster-2', name: 'GEOCLUSTER 2.0', line: 'GPT-OSS-20B AI assistant integration' },
                ],
            },
        ],
    },
    {
        id: 'other-skills',
        title: 'Other Skills',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
        technologies: [
            {
                name: 'AutoCAD',
                proficiency: 4,
                label: 'Advanced',
                description: 'Computer-aided design software for drafting, modeling, and producing technical drawings and plans.',
                uses: [
                    '2D plan and section view drafting',
                    'Building and infrastructure modeling',
                    'Geospatial layout and annotation',
                ],
                projects: [
                    { id: '3d-building-igis', name: '3D Building Model of IGIS', line: '2D plan & section views' },
                ],
            },
            {
                name: 'Microsoft Office',
                proficiency: 4,
                label: 'Advanced',
                description: 'Productivity suite for document preparation, data analysis, and presentations.',
                uses: [
                    'Data analysis and reporting in Excel',
                    'Technical document preparation in Word',
                    'Presentation design for research findings',
                ],
                projects: [],
            },
            {
                name: 'Canva',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Graphic design platform for creating visual content, infographics, and social media assets.',
                uses: [
                    'Infographic and map visualization design',
                    'Social media content creation',
                    'Report and poster layout',
                ],
                projects: [],
            },
            {
                name: '3D Reconstruction',
                proficiency: 3,
                label: 'Intermediate',
                description: 'Creating 3D models from photogrammetric data, stereo pairs, and multi-view imagery.',
                uses: [
                    'Height and distance estimation from stereo pairs',
                    'Building and terrain 3D modeling',
                    'Plan and section view generation',
                ],
                projects: [
                    { id: '3d-building-igis', name: '3D Building Model of IGIS', line: 'Team lead — 3D model & 2D views' },
                ],
            },
            {
                name: 'Engineering Surveying',
                proficiency: 4,
                label: 'Advanced',
                description: 'Plane table surveying including contouring, leveling, GNSS positioning, and control-line establishment.',
                uses: [
                    'Plane table surveying of large areas',
                    'Contouring and leveling',
                    'GNSS positioning and control-line establishment',
                ],
                projects: [],
                popoverText: 'Conducted a full plane table survey of a 100m×100m+ area over several weeks — including contouring, leveling, GNSS positioning, and control-line establishment, with terrain features and vegetation manually surveyed and drawn to scale.',
            },
        ],
    },
];
