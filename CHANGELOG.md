# Changelog

## [1.8.0](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.7.0...v1.8.0) (2025-04-30)


### Features

* Added ability to show the low and high temperatures flanking the current temperature (Only when using temperature as the primary element) ([12cde9e](https://github.com/clarinetJWD/bolder-weather-card/commit/12cde9e7e7725412dbfb4dd6d74ed7f0985acc7e))
* Show or hide dot separators between primary elements. ([12cde9e](https://github.com/clarinetJWD/bolder-weather-card/commit/12cde9e7e7725412dbfb4dd6d74ed7f0985acc7e))


### Bug Fixes

* Fixed wonky layout with the vertical position of the temperature unit. ([12cde9e](https://github.com/clarinetJWD/bolder-weather-card/commit/12cde9e7e7725412dbfb4dd6d74ed7f0985acc7e))

## [1.7.0](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.6.0...v1.7.0) (2025-04-29)


### Features

* Added ability to set the forecast section font size and weight. ([a4434fa](https://github.com/clarinetJWD/bolder-weather-card/commit/a4434faac76cdb55fa78d6a17a294629c3b9f6a0))


### Bug Fixes

* Removed variable for forecast section text align, as it is overridden in render and did not function. ([a4434fa](https://github.com/clarinetJWD/bolder-weather-card/commit/a4434faac76cdb55fa78d6a17a294629c3b9f6a0))

## [1.6.0](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.5.4...v1.6.0) (2025-04-23)


### Features

* Organized configuration into collapsible sections ([2ee3fbc](https://github.com/clarinetJWD/bolder-weather-card/commit/2ee3fbc72480b1a680579e595930554cb0271271))

## [1.5.4](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.5.3...v1.5.4) (2025-04-23)


### Bug Fixes

* Fixed an issue that caused the card to render every second, even if the time format did not include seconds. ([ac52552](https://github.com/clarinetJWD/bolder-weather-card/commit/ac525521e12728cfe1365c2a8e87aa59cab097e9))

## [1.5.3](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.5.2...v1.5.3) (2025-04-23)


### Bug Fixes

* Added "--card-background-color" as a card color fallback when "--ha-card-background" is not specified in the theme. ([2466429](https://github.com/clarinetJWD/bolder-weather-card/commit/2466429bfb2bfdea259bca9bacc86ab6d623fce7))
* Fixed a null-reference error when getting the user's locale. ([9703edf](https://github.com/clarinetJWD/bolder-weather-card/commit/9703edf1e8d48296ed53b95c939a8bc25bd6129e))

## [1.5.2](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.5.1...v1.5.2) (2025-04-22)


### Bug Fixes

* Fixes an issue when specifying styles via yaml configuration: Only the first style item was being applied. ([f31bb3d](https://github.com/clarinetJWD/bolder-weather-card/commit/f31bb3db7c19b9dce257042ca541ae18e9fb7449))

## [1.5.1](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.5.0...v1.5.1) (2025-04-15)


### Bug Fixes

* Fixes an issue where the Title Image would always use 100% for Max Width. ([ae2dd51](https://github.com/clarinetJWD/bolder-weather-card/commit/ae2dd5198d3178559a37617a9215ede14da789f4))

## [1.5.0](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.4.0...v1.5.0) (2025-04-14)


### Features

* Card styles configuration no longer  needs the variable prefix `bolder-weather-card`. ([5032c05](https://github.com/clarinetJWD/bolder-weather-card/commit/5032c052487315af590506f85c3ad5ee414a9b2a))

## [1.4.0](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.3.0...v1.4.0) (2025-04-12)


### Features

* Theme variables can now be set in configuration on a per-card basis. ([82dd320](https://github.com/clarinetJWD/bolder-weather-card/commit/82dd32001c0f06abf88c02a9fd067fb7a87194f6))

## [1.3.0](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.2.2...v1.3.0) (2025-04-11)


### Features

* Added the ability to set the time as the Primary Text. ([2c7cb40](https://github.com/clarinetJWD/bolder-weather-card/commit/2c7cb40cd4704423539b6473abae3008b7b88601))

## [1.2.2](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.2.1...v1.2.2) (2025-04-11)


### Bug Fixes

* Fixed Forecast Row icon rendering for Apple Devices running Safari. ([e1e70fe](https://github.com/clarinetJWD/bolder-weather-card/commit/e1e70fed58922fa3c12785a9b07ea35942d4c0ec))

## [1.2.1](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.2.0...v1.2.1) (2025-04-10)


### Bug Fixes

* Added translation stubs for all languages ([70dca4c](https://github.com/clarinetJWD/bolder-weather-card/commit/70dca4c5d983791bf24181069b25d62ca834a105))

## [1.2.0](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.1.0...v1.2.0) (2025-04-10)


### Features

* Adds UV Index and configuration ([7dd6084](https://github.com/clarinetJWD/bolder-weather-card/commit/7dd6084531e4fa48fb49dcfaff6d849ee95b71fc))

## [1.1.0](https://github.com/clarinetJWD/bolder-weather-card/compare/v1.0.0...v1.1.0) (2025-04-08)


### Features

* Adds Loading UI to the Forecasts section to avoid pop-in ([05848d3](https://github.com/clarinetJWD/bolder-weather-card/commit/05848d3284c95b83e967db0f7a049832769d7918))

## 1.0.0 (2025-04-07)


### Features

* Add ability to show a badge with the air quality index ([#396](https://github.com/clarinetJWD/bolder-weather-card/issues/396)) ([672bb59](https://github.com/clarinetJWD/bolder-weather-card/commit/672bb59858f00ca47a535e308e12ba4d40e6dc72))
* use svg for static icons ([#366](https://github.com/clarinetJWD/bolder-weather-card/issues/366)) ([7699642](https://github.com/clarinetJWD/bolder-weather-card/commit/76996428b09800e6f60a6b7b3f48559e806ae3fb))


### Bug Fixes

* Add additional translations for Hungarian ([#544](https://github.com/clarinetJWD/bolder-weather-card/issues/544)) ([a942e57](https://github.com/clarinetJWD/bolder-weather-card/commit/a942e57d503550f9c80508819baebb4ed403e384))
* Add Arabic support based on [#517](https://github.com/clarinetJWD/bolder-weather-card/issues/517) ([#518](https://github.com/clarinetJWD/bolder-weather-card/issues/518)) ([da03c6e](https://github.com/clarinetJWD/bolder-weather-card/commit/da03c6ebba9a600c28d943285545ed21dbbaa12b))
* Add Croatian language ([#543](https://github.com/clarinetJWD/bolder-weather-card/issues/543)) ([7b9fcd0](https://github.com/clarinetJWD/bolder-weather-card/commit/7b9fcd096a1c9e6573c2943b404b93268d6ebed7))
* Add feels-like translation for Slovenian ([#525](https://github.com/clarinetJWD/bolder-weather-card/issues/525)) ([7a3da16](https://github.com/clarinetJWD/bolder-weather-card/commit/7a3da16dccc22836585fc935039c842d64bc54c6))
* Add Korean translations for "AQI" and "feel like" ([#417](https://github.com/clarinetJWD/bolder-weather-card/issues/417)) ([50fd243](https://github.com/clarinetJWD/bolder-weather-card/commit/50fd24387bde29499a406612b3d0bb9f1bbe6c12))
* Add Luxembourgish language ([#453](https://github.com/clarinetJWD/bolder-weather-card/issues/453)) ([ec776b9](https://github.com/clarinetJWD/bolder-weather-card/commit/ec776b97bda116ef5f390d93cacafcd4f0f10e89))
* Add more "feels like" translations ([#497](https://github.com/clarinetJWD/bolder-weather-card/issues/497)) ([67205d4](https://github.com/clarinetJWD/bolder-weather-card/commit/67205d41a7f7acfbcf336161715efdbe44c9699c))
* Added Welsh Language (Cymraeg) Localisation ([#512](https://github.com/clarinetJWD/bolder-weather-card/issues/512)) ([292ed42](https://github.com/clarinetJWD/bolder-weather-card/commit/292ed4283a419470f10fe8891e26d7cd98352f0b))
* **deps:** update dependency home-assistant-js-websocket to v9 ([1858502](https://github.com/clarinetJWD/bolder-weather-card/commit/1858502e0a2538f980bfde84491dd873f22ce2e5))
* **deps:** update dependency home-assistant-js-websocket to v9.2.0 ([#349](https://github.com/clarinetJWD/bolder-weather-card/issues/349)) ([7daf6a2](https://github.com/clarinetJWD/bolder-weather-card/commit/7daf6a297c5dfb37f533709d1ed25628d96aeee3))
* **deps:** update minor-dependencies ([e30f839](https://github.com/clarinetJWD/bolder-weather-card/commit/e30f839c4e1fc3fe88063036a77797694c047bf0))
* **deps:** update minor-dependencies ([0604802](https://github.com/clarinetJWD/bolder-weather-card/commit/0604802217014fb6ddd261fb58844b0c2c33ee21))
* **deps:** update minor-dependencies ([#431](https://github.com/clarinetJWD/bolder-weather-card/issues/431)) ([db7eb72](https://github.com/clarinetJWD/bolder-weather-card/commit/db7eb72c21902be234ed4149788465a7e48c1ee5))
* **deps:** update minor-dependencies ([#545](https://github.com/clarinetJWD/bolder-weather-card/issues/545)) ([b6623ef](https://github.com/clarinetJWD/bolder-weather-card/commit/b6623efa5f10af90bb704dedd44ac7239354d5f2))
* extractMostOcurring was always returning the first element ([917c2dc](https://github.com/clarinetJWD/bolder-weather-card/commit/917c2dc4d0c1c6ca1af9eb5898fab8551a6d7717))
* Fix custom element define error ([#472](https://github.com/clarinetJWD/bolder-weather-card/issues/472)) ([722fb76](https://github.com/clarinetJWD/bolder-weather-card/commit/722fb763b56282f7b3dbfb5ab55c332c404a3390))
* Localize "feels like" for Estonian ([#500](https://github.com/clarinetJWD/bolder-weather-card/issues/500)) ([47ee2e1](https://github.com/clarinetJWD/bolder-weather-card/commit/47ee2e15218dca9531cabb64914791c2189f71c2))
* Translate "Feels like" into Russian ([#464](https://github.com/clarinetJWD/bolder-weather-card/issues/464)) ([b85379f](https://github.com/clarinetJWD/bolder-weather-card/commit/b85379fdf5a341a4ad802ee36061b086ce385607))
* Translate feels-like in french ([#444](https://github.com/clarinetJWD/bolder-weather-card/issues/444)) ([3af024f](https://github.com/clarinetJWD/bolder-weather-card/commit/3af024f6bfb5fefa6a053066f81278e5c83b1d25))
* Update "Feels like" for ca, es, and pt ([#450](https://github.com/clarinetJWD/bolder-weather-card/issues/450)) ([6cb9f66](https://github.com/clarinetJWD/bolder-weather-card/commit/6cb9f66938c172ff767180eb603e26f35a86dbf1))
* Update "feels-like" translation in it.json ([#414](https://github.com/clarinetJWD/bolder-weather-card/issues/414)) ([1c20972](https://github.com/clarinetJWD/bolder-weather-card/commit/1c209725ba187d5ba2aedc0ffb3ac9b5e0c7f920))
* update Hebrew localize text "feels like" ([#495](https://github.com/clarinetJWD/bolder-weather-card/issues/495)) ([4dc64f1](https://github.com/clarinetJWD/bolder-weather-card/commit/4dc64f1c1ea30d0b484df8507aa78a74634b795d))
* Update indonesian translations ([#421](https://github.com/clarinetJWD/bolder-weather-card/issues/421)) ([65865a0](https://github.com/clarinetJWD/bolder-weather-card/commit/65865a03576517f7f615f0e61639b3eb9c216d38))
* Update Luxembourgish translations ([#473](https://github.com/clarinetJWD/bolder-weather-card/issues/473)) ([ec584de](https://github.com/clarinetJWD/bolder-weather-card/commit/ec584decf5a78300e1652036d494513f2279c49c))
* Update Taiwanese translations ([#425](https://github.com/clarinetJWD/bolder-weather-card/issues/425)) ([fd636b4](https://github.com/clarinetJWD/bolder-weather-card/commit/fd636b4afd4ecc3d92af1f7e6a494f41ba5e5d8c))
* Update to Czech translation for exceptional weather state ([#505](https://github.com/clarinetJWD/bolder-weather-card/issues/505)) ([c3641fa](https://github.com/clarinetJWD/bolder-weather-card/commit/c3641fa30f765e231117dc67f9f1db505de0ad0e))

## [2.8.11](https://github.com/pkissling/clock-weather-card/compare/v2.8.10...v2.8.11) (2025-04-02)


### Bug Fixes

* Add additional translations for Hungarian ([#544](https://github.com/pkissling/clock-weather-card/issues/544)) ([a942e57](https://github.com/pkissling/clock-weather-card/commit/a942e57d503550f9c80508819baebb4ed403e384))
* Add Croatian language ([#543](https://github.com/pkissling/clock-weather-card/issues/543)) ([7b9fcd0](https://github.com/pkissling/clock-weather-card/commit/7b9fcd096a1c9e6573c2943b404b93268d6ebed7))
* Add feels-like translation for Slovenian ([#525](https://github.com/pkissling/clock-weather-card/issues/525)) ([7a3da16](https://github.com/pkissling/clock-weather-card/commit/7a3da16dccc22836585fc935039c842d64bc54c6))
* **deps:** update minor-dependencies ([#545](https://github.com/pkissling/clock-weather-card/issues/545)) ([b6623ef](https://github.com/pkissling/clock-weather-card/commit/b6623efa5f10af90bb704dedd44ac7239354d5f2))

## [2.8.10](https://github.com/pkissling/clock-weather-card/compare/v2.8.9...v2.8.10) (2025-02-18)


### Bug Fixes

* Add Arabic support based on [#517](https://github.com/pkissling/clock-weather-card/issues/517) ([#518](https://github.com/pkissling/clock-weather-card/issues/518)) ([da03c6e](https://github.com/pkissling/clock-weather-card/commit/da03c6ebba9a600c28d943285545ed21dbbaa12b))

## [2.8.9](https://github.com/pkissling/clock-weather-card/compare/v2.8.8...v2.8.9) (2025-02-07)


### Bug Fixes

* Added Welsh Language (Cymraeg) Localisation ([#512](https://github.com/pkissling/clock-weather-card/issues/512)) ([292ed42](https://github.com/pkissling/clock-weather-card/commit/292ed4283a419470f10fe8891e26d7cd98352f0b))

## [2.8.8](https://github.com/pkissling/clock-weather-card/compare/v2.8.7...v2.8.8) (2025-01-28)


### Bug Fixes

* Add more "feels like" translations ([#497](https://github.com/pkissling/clock-weather-card/issues/497)) ([67205d4](https://github.com/pkissling/clock-weather-card/commit/67205d41a7f7acfbcf336161715efdbe44c9699c))
* Localize "feels like" for Estonian ([#500](https://github.com/pkissling/clock-weather-card/issues/500)) ([47ee2e1](https://github.com/pkissling/clock-weather-card/commit/47ee2e15218dca9531cabb64914791c2189f71c2))
* Update to Czech translation for exceptional weather state ([#505](https://github.com/pkissling/clock-weather-card/issues/505)) ([c3641fa](https://github.com/pkissling/clock-weather-card/commit/c3641fa30f765e231117dc67f9f1db505de0ad0e))

## [2.8.7](https://github.com/pkissling/clock-weather-card/compare/v2.8.6...v2.8.7) (2024-12-19)


### Bug Fixes

* update Hebrew localize text "feels like" ([#495](https://github.com/pkissling/clock-weather-card/issues/495)) ([4dc64f1](https://github.com/pkissling/clock-weather-card/commit/4dc64f1c1ea30d0b484df8507aa78a74634b795d))

## [2.8.6](https://github.com/pkissling/clock-weather-card/compare/v2.8.5...v2.8.6) (2024-11-19)


### Bug Fixes

* Fix custom element define error ([#472](https://github.com/pkissling/clock-weather-card/issues/472)) ([722fb76](https://github.com/pkissling/clock-weather-card/commit/722fb763b56282f7b3dbfb5ab55c332c404a3390))
* Translate "Feels like" into Russian ([#464](https://github.com/pkissling/clock-weather-card/issues/464)) ([b85379f](https://github.com/pkissling/clock-weather-card/commit/b85379fdf5a341a4ad802ee36061b086ce385607))
* Update Luxembourgish translations ([#473](https://github.com/pkissling/clock-weather-card/issues/473)) ([ec584de](https://github.com/pkissling/clock-weather-card/commit/ec584decf5a78300e1652036d494513f2279c49c))

## [2.8.5](https://github.com/pkissling/clock-weather-card/compare/v2.8.4...v2.8.5) (2024-09-08)


### Bug Fixes

* Add Luxembourgish language ([#453](https://github.com/pkissling/clock-weather-card/issues/453)) ([ec776b9](https://github.com/pkissling/clock-weather-card/commit/ec776b97bda116ef5f390d93cacafcd4f0f10e89))
* Update "Feels like" for ca, es, and pt ([#450](https://github.com/pkissling/clock-weather-card/issues/450)) ([6cb9f66](https://github.com/pkissling/clock-weather-card/commit/6cb9f66938c172ff767180eb603e26f35a86dbf1))

## [2.8.4](https://github.com/pkissling/clock-weather-card/compare/v2.8.3...v2.8.4) (2024-08-29)


### Bug Fixes

* **deps:** update minor-dependencies ([#431](https://github.com/pkissling/clock-weather-card/issues/431)) ([db7eb72](https://github.com/pkissling/clock-weather-card/commit/db7eb72c21902be234ed4149788465a7e48c1ee5))
* Translate feels-like in french ([#444](https://github.com/pkissling/clock-weather-card/issues/444)) ([3af024f](https://github.com/pkissling/clock-weather-card/commit/3af024f6bfb5fefa6a053066f81278e5c83b1d25))

## [2.8.3](https://github.com/pkissling/clock-weather-card/compare/v2.8.2...v2.8.3) (2024-07-27)


### Bug Fixes

* Update indonesian translations ([#421](https://github.com/pkissling/clock-weather-card/issues/421)) ([65865a0](https://github.com/pkissling/clock-weather-card/commit/65865a03576517f7f615f0e61639b3eb9c216d38))
* Update Taiwanese translations ([#425](https://github.com/pkissling/clock-weather-card/issues/425)) ([fd636b4](https://github.com/pkissling/clock-weather-card/commit/fd636b4afd4ecc3d92af1f7e6a494f41ba5e5d8c))

## [2.8.2](https://github.com/pkissling/clock-weather-card/compare/v2.8.1...v2.8.2) (2024-07-19)


### Bug Fixes

* Add Korean translations for "AQI" and "feel like" ([#417](https://github.com/pkissling/clock-weather-card/issues/417)) ([50fd243](https://github.com/pkissling/clock-weather-card/commit/50fd24387bde29499a406612b3d0bb9f1bbe6c12))

## [2.8.1](https://github.com/pkissling/clock-weather-card/compare/v2.8.0...v2.8.1) (2024-07-13)


### Bug Fixes

* Update "feels-like" translation in it.json ([#414](https://github.com/pkissling/clock-weather-card/issues/414)) ([1c20972](https://github.com/pkissling/clock-weather-card/commit/1c209725ba187d5ba2aedc0ffb3ac9b5e0c7f920))

## [2.8.0](https://github.com/pkissling/clock-weather-card/compare/2.7.0...v2.8.0) (2024-06-20)


### Features

* Add ability to show a badge with the air quality index ([#396](https://github.com/pkissling/clock-weather-card/issues/396)) ([672bb59](https://github.com/pkissling/clock-weather-card/commit/672bb59858f00ca47a535e308e12ba4d40e6dc72))
