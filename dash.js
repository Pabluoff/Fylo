// Add active class to nav items on click
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        item.classList.add('active');
    });
});

// Simulated data updates (for demo purposes)
setInterval(() => {
    // Update random engagement number
    const engagementEl = document.querySelector('.analytics .stat-value');
    const currentValue = parseInt(engagementEl.textContent);
    const newValue = currentValue + Math.floor(Math.random() * 10) - 5;
    engagementEl.textContent = `${newValue}K`;
}, 5000);

// Add smooth hover effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});