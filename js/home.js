// Stories data
const storiesData = [
    { id: 1, username: 'Your story', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=56&h=56&q=80' },
    { id: 2, username: 'vipleiloes', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=56&h=56&q=80' },
    { id: 3, username: 'estudante.rx', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=56&h=56&q=80' },
    { id: 4, username: 'guardamunicipal', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=56&h=56&q=80' },
    { id: 5, username: 'tech.daily', image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=56&h=56&q=80' },
    { id: 6, username: 'travel.pics', image: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=56&h=56&q=80' }
];

// Posts data
const postsData = [
    {
        id: 1,
        user: {
            username: 'fabiogigapro',
            profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&q=80',
            verified: true
        },
        content: {
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80'
        },
        likes: 1270,
        comments: 15,
        bookmarked: false,
        caption: 'Beautiful sunset today! 🌅',
        timeAgo: '2 hours ago'
    },
    {
        id: 2,
        user: {
            username: 'tech.daily',
            profilePic: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=32&h=32&q=80',
            verified: true
        },
        content: {
            image: 'https://images.unsplash.com/photo-1682686581660-3693f0c588d2?w=600&q=80'
        },
        likes: 1543,
        comments: 32,
        bookmarked: false,
        caption: 'Latest tech innovations! 💻',
        timeAgo: '5 hours ago'
    }
];

// Format numbers for display
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Render stories
function renderStories() {
    const storiesContainer = document.getElementById('stories');
    storiesData.forEach(story => {
        const storyElement = document.createElement('div');
        storyElement.className = 'story';
        storyElement.innerHTML = `
            <div class="story-ring">
                <img src="${story.image}" alt="${story.username}">
            </div>
            <span>${story.username}</span>
        `;
        storiesContainer.appendChild(storyElement);
    });
}

// Render posts
function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsData.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <img src="${post.user.profilePic}" alt="${post.user.username}">
                    <span class="username">${post.user.username}</span>
                    ${post.user.verified ? '<svg class="verified" viewBox="0 0 24 24" width="12" height="12"><path fill="#3897f0" d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5.706 9.21-6.5 6.495a1 1 0 0 1-1.414-.001l-3.5-3.503a1 1 0 1 1 1.414-1.414l2.794 2.796L16.293 8.3a1 1 0 0 1 1.414 1.415Z"/></svg>' : ''}
                </div>
                <button class="nav-button">
                    <svg aria-label="More options" class="nav-icon" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="1.5"/>
                        <circle cx="6" cy="12" r="1.5"/>
                        <circle cx="18" cy="12" r="1.5"/>
                    </svg>
                </button>
            </div>
            <div class="post-content">
                <img src="${post.content.image}" alt="Post content">
                <div class="double-tap-area">
                    <svg class="heart-animation" viewBox="0 0 24 24" width="72" height="72">
                        <path fill="currentColor" d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938"/>
                    </svg>
                </div>
            </div>
            <div class="post-actions">
                <div class="left-actions">
                    <button class="nav-button like-button">
                        <svg aria-label="Like" class="nav-icon" viewBox="0 0 24 24">
                            <path fill="none" stroke="white" stroke-width="2" d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938"/>
                        </svg>
                    </button>
                    <button class="nav-button">
                        <svg aria-label="Comment" class="nav-icon" viewBox="0 0 24 24">
                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="nav-button">
                        <svg aria-label="Share Post" class="nav-icon" viewBox="0 0 24 24">
                            <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"/>
                            <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
                <button class="nav-button bookmark-button">
                    <svg aria-label="Save" class="nav-icon" viewBox="0 0 24 24">
                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </button>
            </div>
            <div class="post-info">
                <div class="likes">${formatNumber(post.likes)} likes</div>
                <div class="caption">
                    <span class="username">${post.user.username}</span>
                    <span>${post.caption}</span>
                </div>
                <div class="comments">
                    View all ${post.comments} comments
                </div>
                <div class="timestamp">
                    ${post.timeAgo}
                </div>
            </div>
        `;

        // Add double tap to like
        const postContent = postElement.querySelector('.post-content');
        let lastTap = 0;
        postContent.addEventListener('click', function (e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                const heart = this.querySelector('.heart-animation');
                heart.classList.add('active');
                setTimeout(() => heart.classList.remove('active'), 1000);
                const likeButton = postElement.querySelector('.like-button svg path');
                likeButton.setAttribute('fill', '#ed4956');
                likeButton.setAttribute('stroke', '#ed4956');
            }
            lastTap = currentTime;
        });

        const likeButton = postElement.querySelector('.like-button');
        likeButton.addEventListener('click', function () {
            const icon = this.querySelector('svg path');
            if (icon.getAttribute('fill') === 'none') {
                icon.setAttribute('fill', '#ed4956');
                icon.setAttribute('stroke', '#ed4956'); 
                this.classList.add('like-animation');
            } else {
                icon.setAttribute('fill', 'none'); 
                icon.setAttribute('stroke', 'white');
            }
        });

        // Add bookmark button functionality
        const bookmarkButton = postElement.querySelector('.bookmark-button');
        bookmarkButton.addEventListener('click', function () {
            const icon = this.querySelector('svg polygon');
            if (icon.getAttribute('fill') === 'none') {
                icon.setAttribute('fill', 'currentColor');
            } else {
                icon.setAttribute('fill', 'none');
            }
        });

        postsContainer.appendChild(postElement);
    });
}

// Initialize app
function init() {
    renderStories();
    renderPosts();
}

// Start the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);