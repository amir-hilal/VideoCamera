export const calculateDistance = (touches) => {
  if (touches.length < 2) return 0;
  const [touch1, touch2] = touches;
  const dx = touch1.pageX - touch2.pageX;
  const dy = touch1.pageY - touch2.pageY;
  return Math.hypot(dx, dy); // distance between fingers
};
