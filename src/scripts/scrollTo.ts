(() => {
  document?.querySelectorAll(`[data-scroll-to]`).forEach((el) => {
    const element = el as HTMLBaseElement;

    element?.addEventListener('click', () => {
      const location = window.location.pathname;
      if (location === '/') {
        document
          ?.querySelector(element?.dataset?.scrollTo as string)
          ?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(
          {},
          '',
          element?.dataset?.scrollTo as string
        );
      } else {
        window.location.replace(`/${element?.dataset?.scrollTo as string}`);
      }
    });
  });
})();