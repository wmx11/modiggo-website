<script>
  import 'iconify-icon';
  import config from '../../utils/config';

  const plans = [
    {
      label: 'Apprentice',
      labelDescription:
        'When you have simple requests, requirements, and a low amount of workload.',
      price: 1599,
      priceDescription:
        'Pause or cancel anytime. <br/> <strong>3 months of ~3 hours/month free (valued $315)</strong> support & maintenance after termination.',
      paymentLink: '',
      included: [
        'Free consultation calls up to 2 hours/month',
        '~35 hours/month of work',
        'Unlimited reviews',
        'One request at a time',
        'Pause or cancel anytime',
      ],
    },
    {
      label: 'Journeyman',
      labelDescription:
        'When you have medium complexity requests, requirements, and a semi-consistent workload.',
      price: 5699,
      priceDescription:
        'Pause or cancel anytime. <br/> <strong>3 months of ~8 hours/month (valued $1,680) free</strong> support & maintenance after termination.',
      paymentLink: '',
      included: [
        'Free consultation calls up to 4 hours/month',
        '~80 hours/month of work',
        'Priority support',
        'Unlimited reviews',
        'One request at a time',
        'Pause or cancel anytime',
      ],
    },
    {
      label: 'Master',
      labelDescription:
        'When you have medium-high complexity requests, requirements, and a consistent workload.',
      price: 9999,
      priceDescription:
        'Pause or cancel anytime. <br/> <strong>3 months of ~12 hours/month (valued $3,240) free</strong> support & maintenance after termination.',
      paymentLink: '',
      included: [
        'Free consultation calls up to 8 hours/month',
        '~125 hours/month of work',
        'Priority support',
        'Unlimited reviews',
        'One request at a time',
        'Pause or cancel anytime',
      ],
    },
    {
      label: 'Custom',
      labelDescription:
        'When you’re not sure about the complexity of your requests, requirements, time constraints, and workload.',
      price: 0,
      priceDescription:
        'Pause or cancel anytime. <br/> <strong>3 months free support & maintenance</strong> after termination.',
      paymentLink: '',
      included: [
        'Free consultation calls up to 2 hours/month',
        'Custom hours of work',
        'Development & custom work',
        'Priority & additional support',
        'Unlimited reviews',
        'One request at a time',
        'Pause or cancel anytime',
      ],
    },
  ];

  let period = 1;

  $: discount = period > 1 ? config.priceDiscount : 0;

  const timePeriod = {
    1: 'month',
    3: 'quarter',
    12: 'year',
  };

  const CLASS_ACTIVE = 'tab-active';

  const handleTabClick = (months) => (event) => {
    event?.target?.parentElement
      ?.querySelectorAll(`.${CLASS_ACTIVE}`)
      ?.forEach((el) => el?.classList?.remove(CLASS_ACTIVE));
    event?.target?.classList.add(CLASS_ACTIVE);

    period = months;
  };

  $: calculatePriceWithDiscount = (price) => {
    return Math.round(price * period * (1 - discount));
  };

  $: calculateSavings = (price) => {
    return Math.round(
      (price * period) / 12 - calculatePriceWithDiscount(price) / 12
    );
  };
</script>

<div class="mb-4 flex">
  <div class="tabs tabs-boxed">
    <button class="tab tab-lg tab-active" on:click={handleTabClick(1)}
      >Monthly</button
    >
    <button class="tab tab-lg" on:click={handleTabClick(3)}>Quarterly</button>
    <button class="tab tab-lg" on:click={handleTabClick(12)}>Annually</button>
  </div>
</div>
<div class="flex flex-wrap gap-2 mb-2">
  {#each plans as item}
    <div class="card bg-zinc-100 lg:min-w-[368px] lg:max-w-[368px] p-4">
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
                ).toLocaleString()}/{timePeriod[period]}
              {:else}
                Custom
              {/if}
            </div>
            {#if period > 1 && item.price > 0}
              <div class="text-black/50 text-sm mb-2">
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
          <button class="btn btn-neutral btn-block text-white mb-8 md:mb-2">
            Get started
          </button>
          <a href={config.calendarLink} target="_blank" class="link">
            Book a call
          </a>
        </div>
      </div>
    </div>
  {/each}
</div>
