# Conditional Displayers

This is an Umbraco package. It implements a checkbox and dropdown datatype editors that work like the core ones (in fact they are based in the same code), but allows to hide or display other properties in the same Document Type.

## Installation

### Nuget
[![NuGet](https://buildstats.info/nuget/Our.Umbraco.ConditionalDisplayers)](https://www.nuget.org/packages/Our.Umbraco.ConditionalDisplayers/)

Run this form your Package Manager Console in Visual Studio:

    PM> Install-Package Our.Umbraco.ConditionalDisplayers

### Umbraco Package

https://our.umbraco.com/packages/backoffice-extensions/conditional-displayers/

### Manually
Download the code and copy it into you App_Plugin folder.

## Test Website Credentials:
Username: `admin@admin.com`\
Password: `Password123`

## Configuration

### Checkbox

Create a new DataType and select 'Checkbox Conditional Displayer' as the Property Editor.

-*Default* value: select the value that the checkbox will have by default: checked/unchecked.

-*Show if checked*: enter the aliases of those properties you want to show when the checkbox is checked. Note: these properties <b>will be hidden</b> if it's unchecked.

-*Show if unchecked*: enter the aliases of those properties you want to show when the checkbox is unchecked. Note: these properties <b>will be hidden</b> if it's checked.

### Dropdown

Create a new DataType and select 'Dropdown Conditional Displayer' as the Property Editor.

You'll have to create a list of options that the dropdown will display. In addition to the value you have two other inputs used to show or hide one or more properties.

-*Show if selected*: enter the aliases of those properties you want to show when the checkbox is selected. Note: these properties <b>won't be hidden</b> when this value unselected.
-*Hide if selected*: enter the aliases of those properties you want to show when the checkbox is selected. Note: these properties <b>won't be hidden</b> when this value unselected.

<strong>Note:</strong> the difference of behaviour between the checkbox and the dropdown input logic can be a bit confusing, but after a lot of testing it seems the most flexible way to combine the different possibilities when configuring them. I'm open to other behaviour suggestions.

## Getting the properties values

The Conditional Displayers are normal property editors so you can access their values as with any other property (strongly typed model, GetPropertyValue,...)


# Upgrading
## Version 3.3.0
This version uses the new UUI Library included by default in Umbraco 10.4 + and 11.1 + based on this post: https://umbraco.com/blog/umbraco-product-update-january-2023/

For previous versions of Umbraco that still support the uui, you will need to include or reference the library's css and js files manually.

# Icon
<a target="_blank" href="https://icons8.com/icon/63snXzoESd3s/fire-hydrant">Fire Hydrant</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

# Donate
This package is maintaned by Mario Lopez. If you want to say thank you:

<a href="https://www.buymeacoffee.com/skartknet" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/yellow_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
