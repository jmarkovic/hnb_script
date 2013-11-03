hnb_script
==========

Introduction
------------

Basic NodeJS scripts used to fetch and manipulate currency data from [hnb](http://www.hnb.hr/ "Croatian National Bank") for easy use and distribusion over JSON.
Returns a JSON object containing overview data of a currency table and a list of currencies.

Structure
---------

JSON is formatted in the following order:

```JSON
{
  "made":"string",
  "display":"string",
  "currency":[ {
    "id":"string",
    "name":"string",
    "base":"integer",
    "low":"float",
    "mid":"float",
    "high":"float" }
  ]
}
```
Key _made_ gives a date when the currency table containing all currencies was created while _display_ is the date
when currency is active. In most cases _made_ is going to be one day before _display_. In most cases you'll only need 
_display_ date. Both dates are formated in _ddMMyyyy_ string format.

Key _currency_ holds an array of JSON objects, each presenting one currency tracked by [hnb](http://www.hnb.hr/ "Croatian National Bank").
Keys _low_, _mid_ and _high_ are floats containing values based on Croatian Kuna. In most cases, these floats have 6 digits
after decimal point. Key _base_ represents a total amount of that specific currency used to display _low_, _mid_ and _high_.
In most cases, _base_ is 1, but can be 100. Key _name_ is a three digit codename used to represent specific currency. Key _id_
is a special three digit integer ID specified by [hnb](http://www.hnb.hr/ "Croatian National Bank").

Example
-------

Example output is visible below:

```JSON
{
  "made":"31102013",
  "display":"01112013",
  "currency":[{
    "id":"036",
    "name":"AUD",
    "base":"001",
    "low":5.283763,
    "mid":5.299662,
    "high":5.315561},
    
    {
    "id":"348",
    "name":"HUF",
    "base":"100",
    "low":2.580459,
    "mid":2.588224,
    "high":2.595989}
  ]
}
```

Important thing to notice is that Croatian Kuna will never be returned in the list of currencies because it is
a base currency upon all others are calculated. If you need Croatian Kuna as an object, replicate a currency structure
and place 1 as value of every number variable.

To calculate a value from any currency to Croatian Kuna, formula ```kuna = amount * tier / base``` can be used, where tier is any value
between _low_, _mid_ and _high_. To convert from Kuna to another currency, formula ```converted = kuna * base / tier```. Make sure that
base and tier are always from target currency and not Kuna.

Installation
------------

Currently, this script is only available by cloning this repository:
```
git clone https://github.com/PrimaxLite/hnb_script.git
```
