<script>
  import { palette } from '@niyyah/ui/color';
  import {
    Quote,
    Search,
    Bell,
    ChevronDown,
    ArrowRight,
    User,
    CheckCircle,
    Settings,
    LogOut,
    Menu,
    Globe
  } from 'lucide-svelte';

  const colors = [
    { name: 'taupe', hex: palette.taupe, class: 'bg-taupe text-cream' },
    { name: 'cream', hex: palette.cream, class: 'bg-cream text-midnyt' },
    { name: 'slate', hex: palette.slate, class: 'bg-slate text-cream' },
    { name: 'midnyt', hex: palette.midnyt, class: 'bg-midnyt text-cream' },
    { name: 'bronze', hex: palette.bronze, class: 'bg-bronze text-cream' },
  ];

  const semantics = [
    { name: 'success', hex: palette.success, class: 'bg-success text-white' },
    { name: 'warning', hex: palette.warning, class: 'bg-warning text-white' },
    { name: 'error', hex: palette.error, class: 'bg-error text-white' },
  ];

  let isDropdownOpen = $state(false);
  let dropdownRef;

  $effect(() => {
    if (!isDropdownOpen) return;

    function handleClickOutside(event) {
      if (dropdownRef && !dropdownRef.contains(event.target)) {
        isDropdownOpen = false;
      }
    }

    // Use setTimeout to avoid immediate triggering from the opening click if strictly necessary,
    // but relying on contains() wrapping the toggle button usually suffices.
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="px-4 py-12 md:py-20">
  <div class="mx-auto max-w-2xl space-y-16">

    <!-- Branding -->
    <section class="text-center space-y-4">
      <h1 class="text-4xl font-bold tracking-tight text-midnyt">Brand Design System</h1>
      <p class="text-lg text-slate max-w-prose mx-auto">
        Defined in <code class="bg-gray-100 px-1 py-0.5 rounded text-sm">libs/ui</code>, driven by <span class="font-medium text-midnyt">Organic Minimalism</span>.
      </p>
    </section>

    <!-- Colors -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold border-b border-taupe/20 pb-2">Colors</h2>

      <div class="space-y-4">
        <h3 class="text-lg font-medium text-slate">Brand Palette</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {#each colors as color}
            <div class="flex flex-col group">
              <div class="{color.class} h-24 rounded-md flex items-center justify-center mb-2 transition-transform group-hover:-translate-y-1">
                <span class="font-mono text-sm opacity-80">{color.hex}</span>
              </div>
              <span class="font-medium capitalize">{color.name}</span>
              <code class="text-xs text-slate">--color-{color.name}</code>
            </div>
          {/each}
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium text-slate">Semantic Palette</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {#each semantics as color}
            <div class="flex flex-col group">
              <div class="{color.class} h-24 rounded-md flex items-center justify-center mb-2 transition-transform group-hover:-translate-y-1">
                <span class="font-mono text-sm opacity-80">{color.hex}</span>
              </div>
              <span class="font-medium capitalize">{color.name}</span>
              <code class="text-xs text-slate">--color-{color.name}</code>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold border-b border-taupe/20 pb-2">Typography & Content</h2>
      <div class="p-4 space-y-6">
        <div class="space-y-2">
          <h1 class="text-4xl font-bold text-midnyt">Heading 1 (4xl)</h1>
          <p class="text-slate">Used for hero sections.</p>
        </div>
        <div class="space-y-2">
          <h2 class="text-3xl font-bold text-midnyt">Heading 2 (3xl)</h2>
          <p class="text-slate">Used for major section headers.</p>
        </div>
        <div class="space-y-2">
          <h3 class="text-2xl font-semibold text-midnyt">Heading 3 (2xl)</h3>
          <p class="text-slate">Used for card titles and subsections.</p>
        </div>
        <div class="space-y-2">
          <p class="leading-relaxed text-midnyt">
            This is regular body text (`text-midnyt`). It should be readable, have a relaxed line height, and use the system font stack for clarity. <a href="/design" class="text-bronze underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze">Links look like this</a> and use the bronze accent color.
          </p>

          <blockquote class="border-l-4 border-bronze pl-4 py-4 my-4 italic text-midnyt bg-bronze/5 rounded-r-md">
            "Intention is the foundation of every action. Design with purpose and sincerity."
          </blockquote>

          <p class="text-sm text-slate">
            This is subtle text (`text-slate`) used for metadata, captions, or helper text.
          </p>
        </div>
      </div>
    </section>

    <!-- Components -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold border-b border-taupe/20 pb-2">Components & Inputs</h2>

      <!-- Buttons -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-slate">Buttons & Links</h3>
        <div class="flex flex-wrap gap-4 items-center">
          <button class="bg-midnyt text-cream px-6 py-2.5 rounded-md hover:bg-midnyt/90 transition-colors font-medium flex items-center gap-2">
             <span>Primary Action</span>
             <ArrowRight size={18} />
          </button>

          <button class="bg-bronze text-cream px-6 py-2.5 rounded-md hover:bg-bronze/90 transition-colors font-medium">
            Accent Action
          </button>

          <button class="bg-white border border-slate/30 text-midnyt px-4 py-2.5 rounded-md hover:border-slate/60 transition-colors font-medium">
             <Bell size={20} />
          </button>

          <button class="text-midnyt hover:text-bronze transition-colors p-2 hover:bg-taupe/10 rounded-md">
            <User size={24} />
          </button>

          <a href="/design" class="flex items-center gap-2 text-bronze hover:text-midnyt transition-colors font-medium hover:underline underline-offset-4 decoration-bronze">
            <span>Learn more</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <!-- Inputs -->
       <div class="space-y-4">
        <h3 class="text-lg font-medium text-slate">Input Fields</h3>
        <div class="max-w-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-midnyt mb-1">Email Address</label>
            <div class="relative">
              <input id="email" type="email" placeholder="you@example.com" class="w-full pl-10 pr-3 py-2 border border-slate/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze transition-all" />
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none">
                <User size={18} />
              </div>
            </div>
          </div>

           <div>
            <label for="search" class="block text-sm font-medium text-midnyt mb-1">Search</label>
            <div class="relative">
              <input id="search" type="search" placeholder="Search..." class="w-full pl-10 pr-3 py-2 border border-slate/30 rounded-md focus:outline-none focus:ring-2 focus:ring-bronze/20 focus:border-bronze transition-all" />
              <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none">
                <Search size={18} />
              </div>
            </div>
          </div>

           <div>
            <label for="error-input" class="block text-sm font-medium text-midnyt mb-1">Error State</label>
            <input id="error-input" type="text" value="Invalid input" class="w-full px-3 py-2 border border-error text-error rounded-md focus:outline-none focus:ring-2 focus:ring-error/20" />
            <p class="mt-1 text-xs text-error">Something went wrong.</p>
          </div>
        </div>
      </div>

      <!-- Dropdown -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-slate">Dropdown Menu</h3>
        <div class="relative inline-block text-left group" bind:this={dropdownRef}>
          <button
             onclick={() => (isDropdownOpen = !isDropdownOpen)}
             type="button"
             class="inline-flex justify-center w-full rounded-md border border-slate/30 px-4 py-2 bg-white text-sm font-medium text-midnyt hover:bg-cream/50 focus:outline-none flex items-center gap-2"
          >
            Options
            <ChevronDown size={16} class="transition-transform duration-200 {isDropdownOpen ? 'rotate-180' : ''}" />
          </button>

          <!-- Dropdown panel -->
          {#if isDropdownOpen}
              <div
                 class="absolute z-10 mt-2 w-56 rounded-md bg-white border border-slate/10 ring-1 ring-black/5 divide-y divide-gray-100 origin-top-left transition-all duration-200 ease-out animate-in fade-in zoom-in-95"
              >
                 <div class="p-1">
                    <a href="/design" class="flex items-center gap-2 px-4 py-2 text-sm text-midnyt hover:bg-cream rounded-md group">
                       <User size={16} class="text-slate group-hover:text-bronze" />
                       Profile
                    </a>
                    <a href="/design" class="flex items-center gap-2 px-4 py-2 text-sm text-midnyt hover:bg-cream rounded-md group">
                       <Settings size={16} class="text-slate group-hover:text-bronze" />
                       Settings
                    </a>
                 </div>
                 <div class="p-1">
                    <a href="/design" class="flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/5 rounded-md">
                       <LogOut size={16} />
                       Sign Out
                    </a>
                 </div>
              </div>
          {/if}
        </div>
      </div>
    </section>

    <!-- Example Usage -->
    <section class="space-y-6">
       <h2 class="text-2xl font-semibold border-b border-taupe/20 pb-2">Example Usage</h2>

       <div class="space-y-4">
          <h3 class="text-lg font-medium text-slate">Welcome Header</h3>

          <div class="bg-white border border-taupe/20 rounded-md p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div class="space-y-1">
                <h3 class="text-2xl font-bold text-midnyt flex items-center gap-2">
                  Assalamu alaykum, Thanish!
                </h3>
                <p class="text-slate text-sm">Welcome back to your dashboard.</p>
             </div>
          </div>
       </div>

       <div class="space-y-4">
         <h3 class="text-lg font-medium text-slate">Action Alert</h3>
         <div class="bg-cream border-l-4 border-bronze p-4 flex gap-3 items-start">
            <Bell size={20} class="text-bronze shrink-0 mt-0.5" />
            <div>
               <h4 class="font-medium text-midnyt text-sm">Complete your profile</h4>
               <p class="text-slate text-xs mt-1">You have 3 pending action items to complete before you can start matching.</p>
            </div>
         </div>
       </div>

       <div class="space-y-4">
         <h3 class="text-lg font-medium text-slate">Metric Cards</h3>
         <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-md border border-slate/10">
               <p class="text-slate text-xs uppercase tracking-wider font-semibold">Matches</p>
               <p class="text-3xl font-bold text-midnyt mt-1">12</p>
            </div>
            <div class="bg-white p-4 rounded-md border border-slate/10">
               <p class="text-slate text-xs uppercase tracking-wider font-semibold">Views</p>
               <p class="text-3xl font-bold text-midnyt mt-1">48</p>
            </div>
         </div>
       </div>

       <div class="space-y-4">
         <h3 class="text-lg font-medium text-slate">List Items</h3>
         <div class="border border-slate/10 rounded-md divide-y divide-slate/10 bg-white">
             <!-- List Item 1 -->
             <div class="p-4 flex items-center justify-between hover:bg-cream/30 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3">
                   <div class="h-10 w-10 rounded-full bg-taupe/10 flex items-center justify-center text-taupe group-hover:bg-taupe/20 transition-colors">
                      <User size={20} />
                   </div>
                   <div>
                      <p class="font-medium text-midnyt">New Match Request</p>
                      <p class="text-xs text-slate">2 minutes ago</p>
                   </div>
                </div>
                <!-- Using ArrowRight as a chevron substitute or simpler indicator -->
                <ArrowRight size={16} class="text-slate/50" />
             </div>

             <!-- List Item 2 -->
             <div class="p-4 flex items-center justify-between hover:bg-cream/30 transition-colors cursor-pointer group">
                <div class="flex items-center gap-3">
                   <div class="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success group-hover:bg-success/20 transition-colors">
                      <CheckCircle size={20} />
                   </div>
                   <div>
                      <p class="font-medium text-midnyt">Profile Approved</p>
                      <p class="text-xs text-slate">Yesterday</p>
                   </div>
                </div>
                 <ArrowRight size={16} class="text-slate/50" />
             </div>
          </div>
       </div>

       <div class="space-y-4">
         <h3 class="text-lg font-medium text-slate">Language Picker</h3>
         <div class="flex gap-8">
            <!-- Variant 1: Simple Text Link -->
            <button class="flex items-center gap-2 text-sm font-medium text-midnyt hover:text-bronze transition-colors">
               <Globe size={16} class="text-slate" />
               <span>English</span>
            </button>

            <!-- Variant 2: Minimal Button -->
            <button class="flex items-center gap-2 text-xs font-medium bg-white border border-slate/20 rounded-full px-3 py-1.5 text-midnyt hover:border-slate/40 transition-colors">
               <Globe size={14} class="text-slate" />
               <span>Svenska</span>
            </button>

             <!-- Variant 3: Segmented -->
            <div class="flex items-center text-xs font-medium border border-slate/20 rounded-md overflow-hidden">
               <button class="px-3 py-1.5 bg-cream text-midnyt">EN</button>
               <div class="w-px bg-slate/20 h-full"></div>
               <button class="px-3 py-1.5 bg-white text-slate hover:text-midnyt hover:bg-cream/50 transition-colors">SV</button>
               <div class="w-px bg-slate/20 h-full"></div>
               <button class="px-3 py-1.5 bg-white text-slate hover:text-midnyt hover:bg-cream/50 transition-colors">AR</button>
            </div>
         </div>
       </div>
    </section>

  </div>
</div>
