import ourTeamSliderTpl from '../../templates/our-team-slider.hbs';
import teamMembers from '../data/team.json';

const refs = {
  footerModal: document.getElementById('our-team-modal'),
  sliderContainer: undefined,
};

refs.sliderContainer = refs.footerModal.querySelector('.slider-container');

export function renderSliderMarkup() {
  const markup = ourTeamSliderTpl(teamMembers);
  refs.sliderContainer.innerHTML = markup;

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
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    nav: false,
    arrowKeys: true,
  });
}
