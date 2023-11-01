const colors = document.querySelectorAll('.colors');
const body = document.querySelector('body');
const fontSizes = document.querySelectorAll('.font-sizes button');



colors.forEach(color => {
  color.addEventListener('click', () => {
    if (color.id === 'random') {
      body.style.backgroundColor = getRandomColor();
    } else {
      body.style.backgroundColor = getComputedStyle(color).backgroundColor;
      
    }
  });

});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i<6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

fontSizes.forEach(fontSize => {
    fontSize.addEventListener('click', () => {
        // Remove active class from all buttons
        fontSizes.forEach(button => button.classList.remove('active'));

        // Add active class to the clicked button
        fontSize.classList.add('active');

        // Change font size of body based on the clicked button's ID
        switch (fontSize.id) {
            case 'small':
                body.style.fontSize = '14px';
                break;
            case 'medium':
                body.style.fontSize = '18px';
                break;
            case 'large':
                body.style.fontSize = '22px';
                break;
            default:
                break;
        }
    });
});
