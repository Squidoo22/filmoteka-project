// import teamMembers from '../../data/team.json';
import ourTeamSliderTpl from '../../templates/our-team-slider.hbs';
import teamMembers from '../data/team.json';
// import { tns } from './node_modules/tiny-slider/src/tiny-slider';

const refs = {
  footerModal: document.getElementById('our-team-modal'),
  sliderContainer: undefined,
};
console.log(refs);
refs.sliderContainer = refs.footerModal.querySelector('.slider-container');

console.log(refs);

export function renderSliderMarkup() {
  const markup = ourTeamSliderTpl(teamMembers);
  refs.sliderContainer.innerHTML = markup;
  console.log(markup);

  const slider = tns({
    container: '.my-slider',
    items: 1,
    slideBy: 'page',
    mouseDrag: true,
    swipeAngle: false,
    speed: 400,
    controlsContainer: '#controls',
    prevButton: '.previous',
    nextButton: '.next',
    // autoplay: true,
    autoplayButtonOutput: false,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    nav: false,
    arrowKeys: true,
  });
}
