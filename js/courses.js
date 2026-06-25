const createThumb = (title, backgroundColor, accentColor) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;

    const context = canvas.getContext('2d');

    if (!context) {
        return '';
    }

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = accentColor;
    context.beginPath();
    context.arc(650, 90, 110, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = 'rgba(255, 255, 255, 0.12)';
    context.beginPath();
    context.arc(120, 410, 140, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = '#ffffff';
    context.font = 'bold 54px Arial, Helvetica, sans-serif';
    context.fillText(title, 60, 220, 680);

    context.font = '24px Arial, Helvetica, sans-serif';
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.fillText('Practical learning path', 60, 280, 680);

    return canvas.toDataURL('image/png');
};

window.COURSES = [
    {
        id: 'react-fundamentals',
        title: 'React Fundamentals',
        category: 'Development',
        thumbnail: createThumb('React Fundamentals', '#0f172a', '#2563eb'),
        price: 79,
        description: 'Learn component-based architecture, props, state, hooks, and data flow by building practical React interfaces.',
        instructor: 'Ava Thompson',
    },
    {
        id: 'javascript-mastery',
        title: 'JavaScript Mastery',
        category: 'Development',
        thumbnail: createThumb('JavaScript Mastery', '#111827', '#f59e0b'),
        price: 89,
        description: 'Strengthen your JavaScript foundations with modern syntax, DOM manipulation, asynchronous patterns, and clean code practices.',
        instructor: 'Noah Carter',
    },
    {
        id: 'ui-design-essentials',
        title: 'UI Design Essentials',
        category: 'Design',
        thumbnail: createThumb('UI Design Essentials', '#0f172a', '#ec4899'),
        price: 69,
        description: 'Develop a strong eye for layouts, spacing, color, typography, and component consistency for modern interfaces.',
        instructor: 'Mia Reynolds',
    },
    {
        id: 'figma-for-products',
        title: 'Figma for Products',
        category: 'Design',
        thumbnail: createThumb('Figma for Products', '#082f49', '#14b8a6'),
        price: 59,
        description: 'Create polished product mockups, reusable components, and responsive screen flows using Figma workflows.',
        instructor: 'Ethan Brooks',
    },
    {
        id: 'digital-marketing-accelerator',
        title: 'Digital Marketing Accelerator',
        category: 'Marketing',
        thumbnail: createThumb('Digital Marketing Accelerator', '#1f2937', '#f97316'),
        price: 99,
        description: 'Understand audience targeting, content strategy, email funnels, and campaign measurement across channels.',
        instructor: 'Sophia Bennett',
    },
    {
        id: 'content-strategy-lab',
        title: 'Content Strategy Lab',
        category: 'Marketing',
        thumbnail: createThumb('Content Strategy Lab', '#172554', '#8b5cf6'),
        price: 74,
        description: 'Plan, write, and optimize content that supports brand growth, discovery, and conversion goals.',
        instructor: 'Liam Foster',
    },
];

window.getCourseById = (courseId) => window.COURSES.find((course) => course.id === courseId);