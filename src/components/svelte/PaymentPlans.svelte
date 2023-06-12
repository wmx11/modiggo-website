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

<div class="mb-4 flex">
  <div class="tabs tabs-boxed">
    <button class="tab tab-lg tab-active" on:click={handleTabClick(MONTH)}
      >Monthly</button
    >
    <button class="tab tab-lg" on:click={handleTabClick(QUARTER)}
      >Quarterly</button
    >
    <button class="tab tab-lg" on:click={handleTabClick(YEAR)}>Annually</button>
  </div>
</div>
<div class="flex flex-wrap gap-2 mb-2">
  {#each plans as item}
    <div class="card bg-zinc-100 lg:min-w-[370px] lg:max-w-[370px] p-4">
      <div class="flex flex-col justify-between h-full">
        <div>
          <div class="mb-16 h-full max-h-[120px]">
            <div class="text-3xl font-bold mb-2">{item.label}</div>
            <div class="text-black/50">{item.labelDescription}</div>
          </div>
          <div class="mb-16 h-full max-h-[120px]">
            <div class="text-3xl font-bold mb-2">
              {#if item.price > 0}
                ${calculatePriceWithDiscount(
                  item.price
                ).toLocaleString()}/{timePeriodLabel[period]}
              {:else}
                Custom
              {/if}
            </div>
            {#if period > 1 && item.price > 0}
              <div class="text-white text-sm mb-2 badge badge-secondary">
                Save ${calculateSavings(item.price).toLocaleString()}
                per month
              </div>
            {/if}
            <div class="text-black/50">{@html item.priceDescription}</div>
          </div>
          <div class="mb-16">
            <ul class="[&>li]:mb-2">
              {#each item?.included as el}
                <li class="flex gap-2 items-center">
                  <iconify-icon
                    icon="gg:check-o"
                    class="w-[16px] text-primary"
                  />
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
