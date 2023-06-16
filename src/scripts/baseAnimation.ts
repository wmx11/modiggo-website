import { animate, inView, stagger } from 'motion';

inView(
  'section',
  (info) => {
    animate(
      info.target.querySelectorAll('.animate'),
      {
        opacity: [0, 1],
        transform: ['translateY(-60px) rotate(2deg)', 'translateY(0px)'],
      },
      {
        duration: 0.5,
        delay: stagger(0.1),
      }
    );
  },
  { margin: '-25%' }
);