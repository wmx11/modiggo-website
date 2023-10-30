<script>
  import 'iconify-icon';
  import config from '../../utils/config';

  export let paymentPlansContent;

  const plans = paymentPlansContent
    ?.map((item) => {
      return { ...item.frontmatter };
    })
    ?.sort((a, b) => a.order - b.order);

  const MONTH = 1;
  const QUARTER = 3;
  const YEAR = 12;

  const timePeriodLabel = {
    [MONTH]: 'month',
    [QUARTER]: 'quarter',
    [YEAR]: 'year',
  };

  const CLASS_ACTIVE = 'tab-active';

  // Default period is 1 month
  let period = MONTH;

  $: discount = period > MONTH ? config.priceDiscount : 0;

  const handleTabClick = (periodInMonths) => (event) => {
    event?.target?.parentElement
      ?.querySelectorAll(`.${CLASS_ACTIVE}`)
      ?.forEach((el) => el?.classList?.remove(CLASS_ACTIVE));
    event?.target?.classList.add(CLASS_ACTIVE);

    period = periodInMonths;
  };

  $: calculatePriceWithDiscount = (price) => {
    return Math.round(price * period * (1 - discount));
  };

  $: calculateSavings = (price) => {
    return Math.round(
      (price * period) / YEAR - calculatePriceWithDiscount(price) / YEAR
    );
  };
</script>

<div class="mb-4 flex z-10 relative justify-center">
  <div
    class="tabs tabs-boxed bg-primary lg:min-w-[calc(360px)] lg:max-w-[calc(360px)] justify-between"
  >
    <button
      class="tab tab-lg text-white tab-active"
      on:click={handleTabClick(MONTH)}>Monthly</button
    >
    <button class="tab tab-lg text-white" on:click={handleTabClick(QUARTER)}
      >Quarterly</button
    >
    <button class="tab tab-lg text-white" on:click={handleTabClick(YEAR)}
      >Annually</button
    >
  </div>
</div>
<div class="flex flex-wrap gap-4 mb-4 justify-between z-10 relative">
  {#each plans as item}
    <div
      class="card bg-primary lg:min-w-[calc(360px)] lg:max-w-[calc(360px)] p-4"
    >
      <div class="flex flex-col justify-between h-full">
        <div>
          <div class="mb-16 h-full max-h-[120px]">
            <div class="text-3xl font-bold mb-2">{item.label}</div>
            <div>{item.labelDescription}</div>
          </div>
          <div class="mb-16 h-full max-h-[120px]">
            <div
              class="text-3xl font-bold mb-2 underline underline-offset-auto"
            >
              {#if item.price > 0}
                ${calculatePriceWithDiscount(
                  item.price
                ).toLocaleString()}/{timePeriodLabel[period]}
              {:else}
                Custom Price
              {/if}
            </div>
            {#if period > 1 && item.price > 0}
              <div class="text-white text-sm mb-2 badge badge-secondary">
                Save ${calculateSavings(item.price).toLocaleString()}
                per month
              </div>
            {/if}
            <div>{@html item.priceDescription}</div>
          </div>
          <div class="mb-16">
            <ul class="[&>li]:mb-2">
              {#each item?.included as el}
                <li class="flex gap-2 items-center">
                  <iconify-icon icon="gg:check-o" class="w-[16px] text-white" />
                  {el}
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <div>
          <a
            href={item.price > 0
              ? item.paymentLink[period]
              : config.calendarLink}
            target="_blank"
            class="btn btn-neutral btn-block text-white mb-8 md:mb-2"
          >
            Get started
          </a>
          <a href={config.calendarLink} target="_blank" class="link">
            Book a call
          </a>
        </div>
      </div>
    </div>
  {/each}
</div>
