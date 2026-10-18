---
title: Five browsers I'd recommend over Chrome if you care about privacy
date: 2026-10-17
draft: true
dek: Who is your browser really working for?
tags:
  - Privacy
cover: ""
coverAlt: ""
featured: false
hideFromHome: false
---
<!--
  Properties above:
  - dek: one-sentence hook shown under the title and on cards.
  - tags: first tag is the red category pill. No spaces: threat-research, data-breaches.
  - cover: drag the lead image into this folder and name it "cover", or type its file name here.
  - draft: untick (false) when it's ready, then Commit-and-sync to publish.
  - featured: tick to pin this as the big story on the home page.
  - hideFromHome: tick to keep it off the home page (still listed under Articles).
  Comments like this one never appear on the site.
-->

Chrome is a good browser. It just tracks more than you might think. You may be thinking why do browsers matter? Its just a search engine.

It matters because a browser can see a lot: the sites you visit, the trackers you encounter, and details websites can use to recognize you.

Google spent years saying Chrome would phase out third-party cookies, which can follow you across websites. In 2025, Google dropped that plan and kept them. This also you to be tracked not just in a singular website but across the web.

Incognito doesn't make you invisible either. Google settled a class action over data collected while users browsed in Incognito and agreed to delete billions of browsing records. Google called the lawsuit meritless.

This left a bad taste in my mouth as a general advocate of privacy and open source tools. So I rounded up five suspects and questioned each one: what it blocks, what it hides, and what it costs you. 

I'm ranking them like a ladder. Each step gives you more privacy, usually at the cost of some convenience. The best browser is the highest rung you'll actually use.

#### Rung 1: Brave, the easy switch from Chrome

If you're on Chrome today and want the least painful upgrade, start here. I use Brave and have really enjoyed it.

Brave is built on Chromium, the same open-source engine underneath Chrome. Your sites work the same and your Chrome extensions install the same way. The difference is Brave Shields, which blocks trackers, third-party cookies, and fingerprinting attempts by default. This feature is very useful and the sites that used to be unreadable are now clean.

Brave's ad blocker is built into the browser, not added as an extension, so the Manifest V2 shutdown didn't touch it. Brave overhauled that engine in January 2026 and cut its memory use by 75%.

Here's one I like from the help desk chair: on Windows 11, Brave blocks Microsoft Recall from taking screenshots of your browsing by default. If you aren't aware, Windows Recall is marketed as a conveniency tool for their AI Copilot. Basically on new Copilot Microsoft laptops, it takes screenshots of your desktop every few seconds and feeds them directly to Microsoft servers. Scary, I know!

**The catch:** Brave ships with extras like crypto rewards and an AI assistant. I'd turn those off. And you're still on Google's engine, which matters to some people more than others. I'd recommend watching a Youtube video on how to debloat Brave. Videos like this [one](https://www.youtube.com/watch?v=W6cKFliWW6Q&t=799s) can improve the overall experience.
#### Rung 2: Firefox, the independent one

Firefox is the second cousin that everyone forgets about. It may show up at the reunion and be a little bland but you can always depend on it to be reliable. Firefox is the only mainstream browser that isn't built on Chromium. It runs on Mozilla's own engine, Gecko. 

Remember those third-party cookies Chrome decided to keep? Firefox turns on Total Cookie Protection by default, which gives every website its own separate cookie jar so trackers can't follow you from site to site.

It also lets you run the strongest blockers. Mozilla says it "has no plans to deprecate MV2" and is keeping the blocking feature that ad and tracker blockers rely on ([Mozilla](https://blog.mozilla.org/addons/2024/03/13/manifest-v3-manifest-v2-march-2024-update/)). In plain English, the full version of uBlock Origin, a free ad and tracker blocker, still works in Firefox.

**The catch:** Firefox collects telemetry, meaning usage data, out of the box. Mozilla also took heat in February 2025 when it rewrote its terms and removed the line promising it doesn't sell access to your data. After the backlash, Mozilla said the new license was only there to run basic Firefox features and that it wasn't using your data for AI.

**My fix list for Firefox:** set Enhanced Tracking Protection to Strict, turn off data collection in Settings, and install uBlock Origin. Five minutes, tops. 

#### Rung 3: LibreWolf, Firefox with the work already done

What if someone did that fix list for you?

That's LibreWolf. It's an independent build of Firefox, made from the latest stable Firefox source code. It removes telemetry, disables DRM, and comes with uBlock Origin already installed. It runs on Windows, macOS, Linux, and OpenBSD, and you can install it on Windows with winget ([LibreWolf](https://librewolf.net/)).

**The catch:** "DRM disabled" means some streaming services won't play until you turn it back on. It's also a community project, not a company, so updates come from volunteers which is a plus for me actually.
#### Rung 4: Mullvad Browser, a disguise without the slowdown

Everything so far tries to block trackers. The last two rungs take a different approach.

The best disguise isn't a mask. It's a crowd.

Mullvad Browser was built by the Mullvad VPN company together with the Tor Project. Mullvad describes it as "a Tor Browser without the Tor Network" .

Instead of hiding your details, it makes them look like everyone else's. Every Mullvad Browser user gets a similar fingerprint. It even adds gray bars around the page, called letterboxing, so your exact window size doesn't give you away. Private mode is always on, and telemetry is removed.

It's free, and you don't need Mullvad's VPN to use it.

**The catch:** It doesn't hide your IP addres which most browsers don't without paying for a VPN. Mullvad itself recommends pairing it with a trustworthy VPN ([Mullvad](https://mullvad.net/en/browser)). It's also desktop only: Windows, macOS, and Linux. In my own testing, Mullvad was incredibly snappy and had me thinking about swapping. However, Brave's integration with 

#### Rung 5: Tor Browser, when it matters who you are

Tor Browser is the top of the ladder.

It sends your traffic through a chain of volunteer-run relays, so the website you visit doesn't see your real IP address.

It uses the same crowd strategy as Mullvad, taken way further. Every Windows user shows up as Windows 10. Every Mac shows up as the same macOS version. Fonts and languages are limited, and window sizes snap to set increments ([Tor Project](https://support.torproject.org/anti-fingerprinting/)).

Tor won't even let you pick which operating system to pretend to be. As the Tor Project puts it, "any option to choose would only make users more unique".

That leads to a counterintuitive tip for Tor and Mullvad: don't install extra privacy extensions. Every add-on you add makes you stand out from the crowd you're trying to hide in.

**The catch:** It's slow. You'll see more CAPTCHAs, and some sites block Tor entirely. For most people, it's a tool you keep around for the times it matters, not your everyday browser. I have some friends that will only use certain browsers for other apps like visiting their banking website. This helps to keep your main browser clean.

#### The ladder at a glance

| Browser | Engine | Blocks ads out of the box | Fingerprint approach | Hides your IP | Good daily driver? |
|---|---|---|---|---|---|
| Brave | Chromium | Yes | Randomizes | No | Yes |
| Firefox | Gecko | No (add uBlock Origin) | Blocks known fingerprinters | No | Yes |
| LibreWolf | Gecko | Yes (uBlock Origin) | Hardened Firefox | No | Yes, minus some streaming |
| Mullvad Browser | Gecko (Tor Browser base) | Yes | Blends into the crowd | No (pair with VPN) | For focused use |
| Tor Browser | Gecko | Yes | Blends into the crowd | Yes | No, too slow |

#### What I'd do today

If you're on Chrome, install Brave or Firefox and make it your default before lunch. If you're already on Firefox, take five minutes and harden it, or let LibreWolf do it for you. Keep Mullvad or Tor around for the times you'd rather not be anyone at all.

Chrome will always be Google's browser. Pick one that's yours.

> [!quote]
> The line you want readers to remember.

## What I found

<!-- Drag screenshots into the note. Type the caption between the [ ] of the image link. -->

> [!note]
> Context, method, or a caveat.

> [!disclosure]
> Who was notified, when, and what they did.

## What it means

Close the story. What should the reader do or take away?
