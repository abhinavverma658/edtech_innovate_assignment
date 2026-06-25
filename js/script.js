document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', String(!isOpen));
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const courses = Array.isArray(window.COURSES) ? window.COURSES : [];
    const courseList = document.getElementById('course-list');
    const featuredList = document.getElementById('featured-courses-grid');
    const searchInput = document.getElementById('course-search');
    const categoryFilters = document.querySelectorAll('[data-category-filter]');
    const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

    const getFilteredCourses = () => {
        const searchTerm = (searchInput?.value || '').trim().toLowerCase();
        const activeCategory = document.querySelector('[data-category-filter].is-active')?.dataset.categoryFilter || 'All';

        return courses.filter((course) => {
            const matchesSearch = !searchTerm || course.title.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    };

    const renderCourseCard = (course) => `
        <article class="course-card">
            <a href="course-detail.html?id=${encodeURIComponent(course.id)}">
                <img src="${course.thumbnail}" alt="${course.title}">
                <div class="course-card-body">
                    <p class="course-meta">${course.category} · ${formatPrice(course.price)}</p>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p class="course-meta">Instructor: ${course.instructor}</p>
                    <span class="course-link">View details</span>
                </div>
            </a>
        </article>
    `;

    const renderCourses = (target, list) => {
        if (!target) {
            return;
        }

        if (!list.length) {
            target.innerHTML = '<p class="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white/80 p-8 text-center text-slate-600">No courses match your search and filter.</p>';
            return;
        }

        target.innerHTML = list.map(renderCourseCard).join('');
    };

    const syncCategoryButtons = (activeCategory) => {
        categoryFilters.forEach((button) => {
            const isActive = button.dataset.categoryFilter === activeCategory;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    };

    const updateCourseListing = () => {
        renderCourses(courseList, getFilteredCourses());
    };

    const debounce = (callback, delay = 250) => {
        let timeoutId;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => callback(...args), delay);
        };
    };

    const handleSearchInput = debounce(() => {
        updateCourseListing();
    }, 250);

    if (featuredList) {
        renderCourses(featuredList, courses.slice(0, 6));
    }

    if (courseList) {
        renderCourses(courseList, courses);
    }

    if (searchInput || categoryFilters.length) {
        categoryFilters.forEach((button) => {
            button.addEventListener('click', () => {
                syncCategoryButtons(button.dataset.categoryFilter || 'All');
                updateCourseListing();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
        }

        syncCategoryButtons('All');
    }

    const courseDetailContainer = document.getElementById('course-detail');
    const courseDetailMessage = document.getElementById('course-detail-message');
    const courseId = new URLSearchParams(window.location.search).get('id');
    const selectedCourse = courseId ? window.getCourseById?.(courseId) : null;

    if (courseDetailContainer) {
        if (!selectedCourse) {
            courseDetailContainer.innerHTML = `
                <div class="basic-card basic-card-center">
                    <h1>Course not found</h1>
                    <p>The requested course ID is missing or invalid.</p>
                    <a href="courses.html" class="button button-primary">Back to Courses</a>
                </div>
            `;
            return;
        }

        courseDetailContainer.innerHTML = `
            <section class="detail-layout">
                <div class="basic-card">
                    <img src="${selectedCourse.thumbnail}" alt="${selectedCourse.title}">
                </div>
                <div class="basic-card">
                    <p class="course-meta">${selectedCourse.category}</p>
                    <h1>${selectedCourse.title}</h1>
                    <p>${selectedCourse.description}</p>
                    <p class="course-meta">Instructor: ${selectedCourse.instructor}</p>
                    <p class="course-meta">Price: ${formatPrice(selectedCourse.price)}</p>
                    <p class="course-meta">Course ID: ${selectedCourse.id}</p>
                    <div class="button-row">
                        <button id="enroll-button" type="button" class="button button-primary">Enroll Now</button>
                        <a href="courses.html" class="button button-secondary">Back to Courses</a>
                    </div>
                    <p id="course-detail-message" class="status-message"></p>
                </div>
            </section>
        `;

        const enrollButton = document.getElementById('enroll-button');
        if (enrollButton) {
            enrollButton.addEventListener('click', () => {
                const message = document.getElementById('course-detail-message');
                if (message) {
                    message.textContent = `Enrollment successful for ${selectedCourse.title}.`;
                }
                window.alert(`You have enrolled in ${selectedCourse.title}.`);
            });
        }
    }
});