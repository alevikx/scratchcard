(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container    = document.getElementById('js-container'),
        canvas       = document.getElementById('js-canvas'),
        canvasWidth  = canvas.width,
        canvasHeight = canvas.height,
        ctx          = canvas.getContext('2d'),
        image        = new Image(),
        brush        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABHCAYAAABS+xFmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAFYtSURBVHgBhX1JsG3ZUV3mee839VVVUkkqUIMkJHos+gjCLXjgCMIEeMjMU08gMDNPmHpgj2wCD+yhZx6DB3Z4YEfYAzeATCNkQAIJSahXqbrfvpM+e+daK3Of+764Uv1377nn7CablStz73Ou2+n1z/7Bp9/59N6jX7zx+G4ei213ty3cdjfbLMLcfYv8dj8+mJ/bOU4b/z9eV/o8Xh77vDZin9ds2zhxtnu0t/tWDUQez0t3Y392W1d+y+HY23fH+9m+2h7v92ozz915bp6zH583HcBAalxqZ/mrFi8+b/qM67fWx+Wc5j87xrgdfY73G/ru79UDjvVrLhrGd/vzvn9O2xTS0MOQ077Mv7Wt8Unlz9Fdk9uOtjbohH1TPzqO66BY/b1lLLSZTbLmvHhd9j/n2fQ7ZbdD3reMe7uQ3Rb73r4/6eli1v07zHUes+xvs+dcZ6d5HteUzeYxjXe/7Trae56/5zece9rEnu3t3Z4hq+O7mOeXnONw5Dn3bePceo/bMgLP6wxCtkWgo7GAbvjyq09E3Pz+b/z2xz9np5cENMDqyQuPfnkP+5WjhVcGEpnv2zjhGNwYsY+5jc7jGO/45OMjWog8rcaCi45BzTPnd3OqecXxfYzDOuh1Gtu8BQtTcD7/RBt/GMcSGOoYI8+/pRF9F9E+DOGNdsMvT+7H50CnPCw4jybRW3q91RL9dDxnr6E4RIAhpowictRT4NnCVMgxhjF292XskkoMlbXv8hpzzs37nOdBzLf6n+OJyNPHF9HbgiA47JKr47vWrl/Kl3LFvPLEee6coUs+EYv8zmM1Nc4+84/TtvCB7Tst2YI9pNjcJaM5Z7MKzjjbb1VqEyHGegRp6ah/baa23c92EznTFKY3FXBq+yLTgHrmObTZgJ1ACOxrHEz9BebiqZXAEdl89hdw7oFQx1z2eM482/sBaAeiHRIejp7WV243B0bdShYQqHMIseVMfvP+oxf++b/4L9/zLfYxr/nln//kR663/T8cZ/xYHhSAuOy+IQic54wpg0G1D1EglsjXTx9zMgKUQ2buzY94ia8OVsKR0VC3C6hMxXg7HjTU/L4s3byJvAxSH1cQo23VROz06g50Oj7GvAHsJnOdSHLMZV8R3/q8vu2rznEZhTeDlHVO57MLQOb3t/X5vP7b8Wov5Z1T26mvCGuy5vCE9MtYbpNz4U4bc4HeBeALUDnQ6nbzQqZ2iT9/bhdjUjBJmVWAELhZRtQgcJyCUjVgDRrOXmSnUS5BmFfmxIBI8+0OuQiw8vM4PgY7dEJj1uSicIR/I8o3xl8wrOmw83wBOLEofW0ZcGhgS5RxswpK0SSSn3c5dPaRDjybj88e/f0cWdf1+OfqKv7lMb4fS32QyaRDFbSoY3WZZIoGtAJW+2DEvGokysdmG36gavaHQ75c7sW9IFrvlCzkqQjR03Lq3KBf1yXOYaRbFUMgTzBitzWiAHblt7hzNcuOC4E1eO9oTCY4g5LmquF6GX71kEYzvSZZaoc6dZNOtJUe/Dz1dCxcfYhq9yYm4yhPznPqJ0VNI9dIPHUZoCJgKpNwZ4BlDGMA6W0JFdDmCdSmjWScWZihJ/X0zTsZQvfLwL2DAmJvZ0Dn0NiDnoje/Ds/bgyONPMp120E78Zauh1MBpERLNuWlhuAbDKNxA5vshGHwAQIBRsGt3ljvjiF8oIrRkJCINK1jAfXBUc7Kxj4jH8UEbtcKfMgK5ssK5v3M3AVaifTnXWcIUxEPjh3OGQw2v/u49C/PQ7+w9nGr/3iH/zjPfzfdeEqkuniTllMxCsU8RIS832spCFDXJ63NQMnIHgTqC92yHcMnWeY6FHQLr/ja1caoOg0bYbRHrqyJtpmP5cd5NHAexCVcMwr29zz/Tld6yM8eRPsNtxXx+ks00/HemT3ZXTV7sJS25cV8Qhg6/HYM9I12VywXcpph5Pc8pXZRRAuOzuBliXgxq1pFw3c6OAx7cme/4Lju5z9lA6bLbKGQvscI+0k2XHjRYESROFBn4HdZjSMA/DCSk8bMBqMZm3LSoRRiVtiS8DmeE04QUemfk4bIyCL4+Ae1c3Ud/eDkEiUHu57G5zE3Ej0OU0MsCDRMiikCyWs+THJwQQ7jCCnM1NFv/qlf/1bP/Tb10cR8BfMmEotkS2FMwtowcKA1VTSYTT0M4D48ieNxxUBISw0u53AaqFaeR4uWUCGVqNuQgwJn/HRvb7fQJ6MjpbRKuSj69jTeftX3qKl4+o5iTS8iqBjWq62u1I0RW/1nWg5s9l6nlxQxyq6REUWU6BpttYybOeQo4o3G7Cgs4/BfEeErR6Zuq+1E0dwNytmuTqiho30cQ4hWl98hUzMF/WzDrNtBXQIeqUp767Q0vMoAXaAcitabhWFZedOR7FoNQwOmk3S4WBTJjfLXpuvpJy9+VcwZcf51GHcBnjhFBXjPyzNCaBi7rHYjO0heTRGLJBwM7HdAcxiYN3mAjah+lzVwjpg6btY4RZVgnaerqVldKTILiPKYyGmfbrWza8cx377+hjqz3pTftO9E7gaVPsyQpzXgUl/aSywY2VAiViK7DRGghr0cirxRM8Qizk1LE1eflK5C7sCXFCkj+sEKneWa4cT3sc121JnobhhZI7yXhQQpKRF7OSDftIMFSJzp/8UobXWsf5Egag3l1uZEFqy3ifkjkOUF2c/lJvrw7t4MKgpLgAQo53CZgiCmgLrU/rXCEmK+3i3VeWYPThbOr1WO0ChNa/yVT6sEVLYrjpeDZbO2moHJxZaJuw8GCW8Ks7D5k5WajHWyrU2BnZVdkmHX4+hp6W26K7Pbis+SxSLoaUSjhpUNeJjdTrW8zoZsjZlIG3qr0JrPxmLPbsZSwlB4PdTq/QFbzhugmSJ0Vtc5Dk0Jr1xAtd4zZr79XHuu0xG0HQwuONmJ61b2UGJt2owZgoJmnVaUmIB1TQNb4nEjmMSYg+2RevTPzdnOtk6knPUEoHeCznBhIQuHrTEisqq9HoTs60v6tta9DKhSJt9AWp5AQ93K4R4eR6ZoLUFQ4StCy62zr8JXpe14ZzPj00+O9V0kIbNxCIcKHHBXcyqnr5iKngli0CK6goNHNiWUYPkd7dwTfY0kRJ7L1v45aSgMG+Fel/690ans3KR3yWQHpYVhRdpJwJ6d9pptzkr9lmUYVN33uTiFKrnN2ta78iBIFnGZMe0F4CvSJAMqHlSjC1EMbYkRAZTDmGPLptiw2RN3tomq4zKBtN/k+FFQ3baGQK31Xch4/VzD7gqzhYLyyfU5Php93nxK+PMa2+AhRw5upSp1WxwoNjcs2WljehIs+jKvZl7KR2gFRtnsW3d21UHUmSn3rY2JFver5N3V9jMkiiCm1ur/fYoNVLgqRSRHPXRHf9EXgptoWkiZRtgvnGNyRfFAdAyGEMcQMswyhwuxOEWM2BGFtGAOLOvhOotKzINLsWrrE1ynr1V/dWr8+D4Q4UczHae35hdNPNnGVNlZhO7qvakqg01i1W2/KNVyXbMWg2o6El0dyGhVn6ioOa1LMO0nQ5ZrFqZWkgJi1VYEcWSnZsgLrxSoOjAZjMLyzExI2vO3o2Pu2qwRpentXo8Ls4JyAr6doYmkLQutH6zk33RvQXppEVe0UWAZAzqs2sE+mg1PW/mncWFsvVWREVAME4ba5DiaMG6XBp8bG5leuN1zamkYlkvczMrdK/O9mbyZrezK4ooT51tpsK8qD0uFurr+BzoVOaGiXC1SEqdn+AT5UUQi1wdAxUAs1OWanblK1bF8nL8uRlVxmytDjuJWbDOkOOfw+vpSgEIUNdLPl7idGMJp60VhADDxfxr7UK6N82zyKNSR1+6wvu6khbTR9ukVlhQ1HzoQ86Zq1QARTgKrQZ2O+a+F5+0hpzqMocb3r8xZuaiIpgQfaTNqGpAnI84NoTCr3XNEjk2d11R1iSgZr9JJFwpeQORUulmyha9qTsqqrFcZjLlrhAoWu4tywYj9Si2guumwexZmcCCsjXTz0DMerhkkgwo4cbKfwylRiYbKaCjhV32L/EzqNEN6WZkW1JCL186P7pctTRO9AL+7i0aF+AIK67Lqpr7Y/A1gt7HqXCkRqPRdhX8NGC35rbO8yEkNyBaI2mOC9VLwwTUYjZFUiaxPBnz3YyFYdM0FghJNpDYaBVmfO77n19tsk5FdMlmlR0yzT7PzRjyhBIlA15kaX+bL9buLRJstmCmce6K3pupQK1yAy8OET6KgjM3q31GKfNgFats66SCHjtknVv0YGfO6zZjcsmFDq+VqCAoi6BCN9GJskGvAHg1wCsSMLwGaAIlj+igTc2qRJXxnTsFCoaEp4AY6gDpWhC8XKBgVL+URJeAeFvdV25rubMB55HHyoC8jXqzKnkwQM3AGsgoIagpUhbMDaaNuDlZ2M62g7mnV3lKZsy8y2VT8I8VaayTublZfK/VzBzPie1ZYXRScy8byqMkMDsU2aJNlICvcaDFjqKoUQNEo9yLFStrcoxDb5kKeh6GMrDlYcMxE30ACrgAxcEYarFo9URTMgXMamzBoxTvqjdj90E6Ouyj6Q7z6JpJwNK2BRggI4ABO3elrWk8AhOM13PVyBrZtgXy6OJuC6w2byPr4DVFtjBHvl9qJNIUGZzkCiCIZiyaMkyAOtZ6hJHsqxoiVm5wNgxmTwOmblAIDhk/Oti8fHQ3W7YaVJjopI+RHuHH5fty6J56EfQaM4g6ALVAtOtiC0nPST7McFu9LOzSB2yuNqetZXGr0sJqt7IMlXytBY82Fqb+Le0nsPhFsDAGglEj3OVS4D+RzCkzqly3KM6j1UPomALv7Or0yuN7sSzH/lNTJBI2QaFT8BYX9aymb4xfSNq64nnXMjyaBi/vrQoEuHOdXhVSFqUJ3yOtl4PlfUUZ3QRCkOoJsFJx+dm3NqqGIQCJIP6VJC2jx8Z24DMEro2bhFOIDhHJKTevFaJkB2WkdKxCFABWN3Aoi5SXdNAKqsS8nGcWGVrAqrAURsZz0Ld3tKAy3NbyQR4ptg3BdoebDqGYRXoUuE7DyL9hFdxgAmK6ZqxCK3UseKW/ttkGHRryQF6IwBIdWXL8sjEOYo5hO7MqTaw8edPozShLb7ooG+McC6B4bmgcAfiTK5GhOg3PvLZPQEHemKvcxBblM+JKQOKUUSVTI0VCQJodq2w3v8AOC8vb/LiXYX69zf1WXlmBikkSWwuQADzrvhQFYmuGwzHPHhE+vAFXuDfwK6BlWKEMlaUtA5pUbn68lkoEjs1rpNDNdKuNuiJPbjonszKqyLKwr9W+5rCIee7yI9yPaBy0E3DxJsxXCm5iLzKBYlEl7I4RCYQQXFgZQG/bsoAcmA0MXRlMFKOh7a8ym3R+K99q3+L7Su1ShGt0b36uCWyoUSwAM7/dqBZvVwiIHOfEmcy4mobttqIoMokqIndAMMW3PD/BTY5uYCRbBoQWoamGQG0lCKFRduvdluabnfQhCsFqCLIPZRaaH+txTE17maSBlbxZjDThxjPtNdgwyGKxtGEae9DeU4SyD45Mok4ZbnKKtO8itoRM5lW4CPIf9cQ9QTOLiFYZhDXc7E7AsggRfbcEN4GCuXKuaMU0t56ysbxC24oVyhbLbmwL3M5YBtAJq3FrlQUimh+3WHJVSDBa7fkacq4xcuBqfnLe6MDWvjQ573yT3k/d5OUQEnjfYE6zfuNY/cGQtf4MkFOwdLECHtE//Y1MueOVd3Co1NB83U0MvUXJlRWPtuxcfbmfcArjDA7fhAlr/7RJU92GuoU3GImZ036N4Xens21xajvajMUUE0oDqUAHK2OWx5OsCk50hECdCFi0qT+IeU9BR3M8OFmPYwZ2YgwNpjrJSCus5Co/WLSaIrqyxdLYsFaSnQ8KIKHlgCptoo0KuMFQZOdlUmXykXYKQFjT/jyGNKAbZPXnjT7QaZywSObrVlmARcEs9BYwp7kRfat20YKuKflXx/PdbhJywJQsb5nJ/Vw04+0Iavvu9AOUQyjfooLpORaaK4KCF5wlEUu/yekI3K2FFGhRo7MOXIDQ1vUOt87rr60IZ01eaYRsRH2qyOTWvdisI/isW9GJnd8lk7Kqh+V/ZFc0Rnivk/YnbHW7kuJaJDVf9krOo5xZgjE80HuaZEXoIloBzawDFrte3UpFay9xNof1qqdBJt6dqkVdXUisUhVDq5rTd7HZ2JvKvTmH3IYMC2EMzlpx6QIEMAY6Gch5mUm60U41a3PXdgL1DRQlZLggIirwI/C5ERV7clTytALl+otzpJOQjNLC6jqXWgnMlM1W+AwJOEtmrlgsNhIN8NJUTxYgh8OITibSPkymnCRohnVeB/1gVRvfG30CY9+iJY07VR0VVItuGaSaHzdNKkGEAbtSsKpjbQkupkUDKa3NeMJHy7Yy6PPLSvJ23F4pqgrsb4OU0GJF9RCPF4AtqwUmpqUoJGZgOCjcwDWoTcl5VkVaSwHQslvTfZa6DLlu2s7h2JN5sdbVAMUno84JeI8lp4hoK+Zmh1un0Nr6RQOZ6kEEgGDNQ2EsbT1a8XydIng72JF7bWhV6sF6l6C9Bjeu3yjBanuOYeu452ZlzLlNrryWIsas6Mu12oTkQdHQO7CZSkx5dURrtIqwnD6fBRZ9v9VkAdBzKFUklMrh56lRsFrPS/GytlgDROqOgQlytWhcRSkL8N4rIBWV7Wpj5KgpNuR22nNYJ4+Uv4ltebcxK24f55WyBvji0uXAUZ5DycHSU7/MihlgOZa4iqK8+zK9ZG4MGHkbfMryiHh4ANoMOJ6PtfJ6dFdwmSNhkMHh/IQHz/pj3WuaWQH3bDFCKhTRg5qMzdaqXTnvRGb50cpqKc18XVP8PbJ7BRiFl+WfHG6pjWDli7aa9xlSQsjNwSXyGAAsl/3HhXrWFl2mlN4GVn15x2vjnpnAPq9zfGy1HtDKKaC9rQy5Conot8OLqGzOC7Pfql04liel72zaTFjfTJ3ElcBsqnnAjtcL5XkgapRIMRWUH62nXE7Ghwl1R6iAbPRCbMh1s7qK7Zhsz/mknTjJSCKaV1NiHq1ytTCDHN9ubSUWgydTLbY1P/UavVYry3DNO2C0IXWQcrMlpmiCW0+FS8XlGM0QfTH61RB5/bbkTzzRRIfVSphshiVRV7shmcjer8yRZCRYpafnNqfj+MC3nYwJiJLPsRzIkz4WURp2BBfzWKiGdVOqabBZbVw3W/EIgYilmJB8vIhC6LKaqsllvNW36nXNnIQjB6IyX/SqlZ2uBSnPt94K7FxdBOg4HStkEQlSTAuzHTrfMMAsougzrkSO693OikJu0SxwDnlbvZYyjA5yfCKQmwzApIWaKi5Pv6O1+lJXTBAMa/ypZyESWVv1UWpDwcEvQiak78xsWTHFODMvaE8xW9u1tolwMkyrNjCiXAa3WSpjWmUspu9loeYtXUtZZru4u835XMoF3ltWT1k5TCqETQAzAeACDhe46SUggFKBm7hjgzfdGVOAxvHGKGJwcZeFduknOxWYutmiSC1EGadbxXpvrm1kDN53FQST0mnYzG7EYCtUSn8JTMmi8+bhwNgYFLLXoRfobtK2qx1tzAubVbsKluntGlkrjDjDly0XpsLSHQAPoZyFOc3eMra0F0T0EppSy958TzdREhMBweu6g+NSYyH4+ek7L6G2nrzMqrIXWazXtdwiUFYw0kPjhHJpH8xvWs5GLHCrG/0TuXdrBfu0yohz7cjWlbpoeO6wmNgaOBswPO8LVV7VGIxgiWlhen0DGtf0qh5Dh+XsXP5nXeze4ntTpTUWLEa1edEpR0DEhM8g48yGsjbl6BZXy3izK9aqtmYXRlmr2J7tT98R0NBdy5gtMQlOFYXo5rLPqMpAAfpsltIKIhdFI6VvbWWi5BXUw2KKRvO1nJxrMiuLU2YJO7qy2l5A9z7vx2uqy7Ej9+p6aKWXRNPIuOMN8Di/kHagYwLqdAk8eCqqPmwkTaPZXURypvMDuG5IIsCsphVM2gVuVZMnKpU70EBRVIAZhNEP8QxLLDl7R4b24lxKRX46owAIYcCqrtwwhzUtGqKJsEAYijilRA2C11jDVL/lv3Rw7MbhIDYaT6WKBubVtj4IzHI1ImXKLttzz6RoRvOK5ZE5PMdI2pHXcuVm+lMEAssY45ULdtu+FycbZdas/V/W00twAy92w3h7ZQW2YEt6Mo/AzRs4nxQGNtX2JvEWzuYQ4lm1TQIzFqb50mchZsqiA0CCGFcvkXsjDdX10UFdvoZ/N9Z0W6lhlqNn8Md108FMdz31eiT/j1kUq88eCP4ZY5BesSeCYAcFK/lHgZNwzU5VF5j1hoGawBwqRVllyGh3V8LkUjtdSCzdqi6H4ciT817MPe+QCKtKYyskKgXdwcWi2vJE8gATDpiB88nuLI2AsVWQ7EJoa74mnRp3U0zxjOHtrO2zsZLXkk5agygGs6RQsdp2sTDgYr7ms0ubfV/rKrdiYFAkGSweFG/i6VNz09ryBn1iFwBGugL6jeMj1cBPXMwbpAk6zv0NXm2c3pt5q3Vs1iIyd18nmd2cUa4iDTQk8ewtP+QDIplmTA3sufJQD1bL8Uaz401FIK0Qppys0lepYiWcUyFbcx69J6NwUYYiXc0KmLcbtyWYkMO4UhdVkyBThCmKea1OLC4W/GmEjOQ1tMqerdkZ/0Y54m4NA0MA7UtgTZBKnUFYqTiV9eDl4G5kvJtE1AvUtQiSd1wY8zwzTX0GixqAFNJgFHbQ9LnMkWmoHNlQH0iNDJC4alrmjDuLdG8pE3JnQLvrBvRTNuZCPQgpylYHWOSCH0a/2+Lc0wv2fDAoogwjhZFJtVE0YMQxcDChWrjAsegjCGcRnuiLAU3aUemgHpbAKufpVUoRfbQQQF33szB1tKsP9PJBgVJE5KNQXydboIwUmcAJtA332BXlzfNSdgA9EynbltEJDPRXPlTpjiHyzaC4sRDgWB1zPItNAYSP0A5JdmsMEmKwnjpCXzmpyqqclzQF9N3y/R+OtTO0lCEeJEgiXzLCnFuKsS3a0kkt/RSA0bH1eHoGE6iXpsXyxpzXTjCAaOJkyzLlsQi7y67z7pAgV3TcCBGFuuyofMRCsYrNdFbnVrRUt77KGJz6KtF7q9k1wzaTdIzB1SQCCGxhxqgMxIJidoomy9aWCteQrzBYMudiRLPgMAXh+Q1ljEmxrIQ6UQg0p7mikjeCbZLB+Zgfk5dRo1F7uoRGTScmDQFhPLpbV8xmWmi5+p6m6hFVtlBrFBkaZHNzYZNcyStzuWC4mju1mu+vs5ItmWqE2FEInsYBJCDVXf2+OKkouQGoNIjmew4BYscimFD+qTtfxdgEZAQLL6Qj9YyE9fFs7kCtpzEoa6pIobOuY1Z7fCb0T6YFEUS7al0/p80GiMw0WK/mWxqi2bfUEZeaKBlBF9dC06qdLbHIJctmluqDAUPmE+v+n3Fe/jpKPr7WGqDiEjhNELxBHRnmfGFZlgVZlcN4vVW9RxTX7MRcbAFWTFIZVDDp2k4EoF8PO5gM0VshPGVQTmnlIN7wwGBggVKFWa8DVhaa3QaBP6qWxbzJ+ETcENDNdtKFyeib/Qh9KrC0yXk7t6rRSyVgHJ8PbNxxjPcSGi0rGBeydJUMvgoFc+tDPsrdADy08tSZUKhDCVPFUkiOh1zP8IgiK/dvAYuXhLVMRq0r+9SBkPjzRLRy7d4hny0bVyqsu7xXuIgaxMoIvNUcyrJg95kWhtNTrVt0yurKW6G+Ma10mMUGraKmCVh6tLbTUEhG06hZ8uqmEjmfDEQ064hbiuACvcKvPl0YNqNnSMjsxBsYbX7yEN6yI5Gq5uG+MLAgqwI2SFBa8bIGlnVRjt1KibL2Oogw7TIw7kInUNSmpaTuJaA2FsEs6Nfe59BDgcSTr63tueqBAFVwuXgJoW7zjJrvErS8CxNFfjSn1NkBdphWBVbMugUTU9SB9NsdAV49hpRcr2JC1gEdyZA1n1f8NTpe1NAiWeDysPcmTNYZGVh3D7EV1hMHUZi32uCu9b46YpCT18gczg/90YXgKm3wscy1JsIZAkqUQsataWKfTpmm7j1skltfw0b1g4opi9wL6o3nmEJwh6Hae9WbS1yYKhtLzthjs1018HQr42D+SUCBwle1pnBcO7OE0k2C0SbuGosQKylqj/pZ39oqxZFhz/ajwOTErsLFeJZHQJ+lrAK8e4cQ43aRui6ECWJT1tlnv9ZYU2BnoT5Q+4MfyEoC/eXUizQWWONERdmIs4PQOpxgXJoyb8xEABFVi+TiisokbQy2vC9t11+lfO5e1zqMg49/4Shpqzynro4WNUK2kQNcFwS8BzIAB81L4wfDXYImx8H6lThXKkpKNaxOBuVjtcrcIcEzRSvdQUfQ+wQY/sYya3zo7iYW54AsPdYifBuzPC5q70ZqW3HeWD9d0hQ7530FUjUAh+JlLLGOC+fnsesSGMIVPuKRn2Q3yQ74NYS4tbsiakUtc03SbTNrLAzFyKbH8AYlKLBWcdo6YKEJN9EiOZ1kqroSo/mUxQb3CY3flIr14Ia8O+9oCF/u81NNANXIlhFinIy3Jp6htGOhx06cdHpKK4l60SnruZgemSVbS7dqPsxgewYxDVmztOLcPJmgJtDpzXS/alioYeSgvXwp+kmq4HMMW93AHai/AAAgX2i10ige7zVCAMcSh4IPmbDoQa+lY+RFuEZ5huxLgD7O3eiL3sUg9oHvJFj0wbatvbhKjW8uAkMXdDqpShhFBIBKVTP0+ZynHeuCHS/Yv8K8Z8iY5aR5XVGeXK80p/3n5Cuq7LWCmGMuPEmmEEGDxioidNUYTOhfOXfZqz7HWRLobwk79RBApbYQPOrX1kU/I4BbIRlL8gA5OB4lb5y7EQnWqHnhE2adC3H5xVSkqqRKdWHhvRWTqO6tFa7REfiFhs7OJLisKFZpKIW2OorSFsprnoWNioUr+VVYB2l2u2EkafRzp3LcfcH9ne+5I5N+8nC31197xobEQpbtFZOxNoOLypCsRLkSOb7B3dU9wlqbu5+KqwnMOyC6DLk648qlA8gNLYfffWGzVz9wd87pK1944sUcMD1ospgS9oFh8rlq3MyadVCrhYyX331t73zljr/+zaf2xjdvFvBlYFPKBnfxSxvHV704omiQgFFPxjbK3BRYTiQUF2f9yqzbjEerbflmxS6ing1G48zSmZPF8z5B3RRttWpcDyxEL0ZwR6Cg3rBVoUFF5M/fFbIXoernEMBQ0ZsoPH/YNYcbWlCaRfeSiZ+k0uQeYogm3uZRQbGde82rqwCZJml2aecAKOl5/pfRLhbTYHjHpa48ugpF1U+LSQ2F8lS3DlgpA0caeF5xCO+gkOECc8J7wT328sRK4BH1IfeElDZak8G5tUKzmZCWYKfobXZZ35tT21gcn01fHzj1/T/+or/zleuaP16PH+32hT9/FF/74hOnQ5PlkF00sqJDJsq+ANg6lIjcJoAqjiIQF4aTXQZjRFhjrIzkLiPWClh2z711ed79B1f2oe95wV7/xjP76hefFNIhpZgVwB7CG+EMlhMwi21Jk0te73z3Hfuuo4/Pf9oOsL8hFHsPcCrWH29/6Kde9CH7z3zybXv7zZsmnjXY6Q3uF/V8P38Y3LyknUKqWlyNEfPSk0zEQfPLXY6KtDBn3cfBtseHvTHG9ImclwXvIAmmbwz8nIhMZ5kXGpHhpAYqZbPosyhDi7JHnpffBVfrY7222qaWL0xTcZcUIwQstI/rqC1jFE83f74k5PJP/kN+3AwuuBmzgR+iDQ3Giy2ZF1XkTgJOQB1Puag+BFZaJkOwwbgys6hAFYTU6WUJeUnOxhnYZMcYbAWIrtBLB4DmHbqhu5NRrYG7DSB6uqBydaYlH/sbD+zlA7AGQH3pLx/bfmNxde320ruu/JVX79g7Xrzyr1l31gKMqIiSotpUN8863Ubl1jnM5PyEf6E2QyndaObBS1c2xvH6N58dDOZZgdLE39RBtPQkBa4aUU/HStBNDAoWsm6mgVUbGu+vr7d4/0fu27Nn4V/67OOQKZm34BDqyloaVk3n+B68fOWDmY3X+z50zz7zx283Oq2stMZ19goSfwZqmv/G4Bi1yZWE1soCOgjoC0YZlRCUlgri9ujlchau0sqCShPd7V6Jcwr7U3/URCmvF9iFnPRdmlIjhbFKt14EsrgAq1ab1sSd15SIg9lnOPjKPH7N0eEst0Vd7eK+h0HVlV6A9qUykcpIERXDImhGJbQwYtlyKOiHU1OOlKS6KqF5LTGbdfCSLYcUC3WHYlzKLncBVE3OGMU0SLTaPJlKcveqs0gNXnHUiHsF4C70sAOQNnv3d9yZadMf/96bE7ggjvjS5w6G8sLV4aQ7GFELKL1ksPoTWUX7toRrvhgyJtWu6fVonPLgxSv74EfvH989mqBFvwC9oNMWOJmVrVuUCDtuM/1z4zO86Hs1Zo04Dx2syD/0fS/Y40NWX/7c4yb7YmUnv+GMBDtkhoNZfelzj20A8hf/4lEpxk74FGILRIsefpgQKNblhcWszCrVci1jmPxs/NnbuMYhbr9xGqO0BNsOyr+CJZlatOdkASgpnPQHasSjg91q1SU6Vb4INJ0x8Q6BCp2orlTUVDF16lcGGxdK6uqisc7+UPZAMX5+cb2cT0K9yZhxGPKDp7lcPkflLZ452Rgk3tP/TeCuIqtrFdbbf2gKME7/h3NVauYNojhQCruAK5PX7CTqbMg1Xb/yaXhvrVMqaY+GD+BirppEK86YEXTRvsv9NLrQrTWj1jMG+exmH8AVZFGMto8f3RhXRWXoW1sjYbheeii36qKJythrKGUh5bDojys2PQ1jmMfJLqyjw6PPuG2B0ajiqkPZLj8opraCQgjMmqObMRJnq53JOowQNPIklYABe3zuTx9yuL7SoFqK5x3VohMu0y6Q7dm6wfpWmSb4SLyNFjjuPAqmdDUH1qTIvQKbeHFaiJHtFb/mzRt7sldpRtNXcLdFJklkjP7MHA3XwAuJkHTCvFOouJsMVKsn8A0v2Tvu3Im26/kkfNODDhbV9dLBdSnKjEwrAj+I2tI2MxVeETr7YDCg/NfZ36YHm9M33FpUnE2F8N8U2pgXznvRCICsnHurMBWNpaubN9MpD/PqofMfbWApthHl34wgvrYL0IW8ukmM89qztVzWbGWkTnV6zvzp48S/dxwR/70fuOtf+6snKTvwPNVKmGGgwVGLee/778b9++7Pjlr9YA6vffWpUYvved9R9D5Y2xuvPYsX33nlg829/cZuX//Skzmr6yP9fNerd/xIPUe6NRnUKPq/6713Yrv2OY57L1zFSFFfeuVqCuXBS9fHGO/RmeybR39PnwapQxzn+ThnsMfHj8K+ddSvRlE8bZ6CCLs6GNOr7783Wc6jh7t/7QuP7eHDULqdcnLYR35+9ej3DtYojuvtOz54j8L1t465v/3GTWPrRx/X45r7Rx+bvfXGlE0cLBauM/1zzNWu77oPud08ExrGi8ecR7o+XkM2D9+ccqSblC7hDS0wlGed0sEWEI2ORbcE+XG3boW2kH9HYg9oCUJIlLDgJgUatDhxs3IMBtMCZ9ozdCQXqbBHMEHNDcUJTlckzPLGvnTP6hLtdcDKftfPdpFCNhnidd0wPy+YhrNzjd8hbztVJgypaiuqlNz5fVvh4jg6YPmV4XnQdS915T/ePDRatO+G3eolFZlUtPVoYbmipw5AsqxLkRoloCgpsMJnDGZpk96oCCX47HhujSu5jGy8hkN99YuP58rax374gb3vw/cm+Bz1I5+O4gsqztd3ftc9/8CRrh1O3KPKdKw//t03pySOtvyNAzQOMPPvPGo24zWA6Phvsrsf/MkX7f79DTM6hna0N4DrhZeu/OrK57kvvevaP/pDL2gIo671yqvXVMlRVD9A68kA0M0+/P0P/NX33YHn5Kg++DE7iuIP7QufeSQHvf9gsx/5my8fgKhfsj4K9PftL//skf3lpx+KxIuhQq3f+yMPBGQDcL/n4w+cehx9PHzjRnN5x8tX9uN/950T2Mfr1dHJDzzwz/zRW8e8nqo8MGQ9wOlTD9+0N771bGr6w993f8qrNJ7vBkD/2R++JZSxDlhEnlaP6a8MtmVtTZm1z5thsyCrthLpAsBSsSjTpOkzpxVfq4LmXPkN6QcYYqcV9gZOBUAYFU6Y49oLFhpo5wqiEYgLrPJ7OpdBIkkwcUUDL5Z6POyW17X7ZX6JO8jQKHYcNPoNndVnJEsoDME3CyDc2gS9AGvsL2l7L4tFiTL2ZNmw5bkDny1jyL685YDLpJxRB0HJmKbM73cpvhBH2ji1JDnEymxdf8DREMtgUNZW2OjE4/hYvRqs6GBOs340a0gf81nf+uKfPzxA7SnPj/e8/65/+PsSSMaq4sEw/OZY3X/v++7OOk0fzkuHQw6W9OXPP55M7K3Xb6biDsDyewdgzbrOUfiffR/MbPSfgs2JD0f+f7/35uxzMKOv/tXjCWac42AuQ4ZHvev4/o49e5ILCW+8dhPbQc7e/epd+zrO58Du3b86alI39ukDQEZt6pX3Xtv7juL6h773/mB68frXn3VSMv8dNvLJ//2mj8WJH/yJd0z28yefeFOA/uRR84rj9cp33J3M6zN/9HD8Gk285313fDC1j/zAA3vt62/EzdOw7qiOJfBD7j6K8mNcf/6pt+NI132wzYO1+je+/JRQRey8BKjnHIc5xS3nNnbGbYBaBY8CLoBQs0dGZFVoAz7g7uULSavy+n21aSqxBdD2RQg0WPtCO2UeK24kYPEMNy9mlywMframh3FKy9c2+7n9++tYWCNXCya8C7isuyN1IB4UdhKDWZ2FtwEo87bWMAx+KyH4CRtC5pFY4/0RJ7W5Ls+BkrzqkbZUWWxhWQxgUwR7Va1wtZ/0eqFTr0RSfGxu0et7NTVzzKHtU2vbAead+WNinz/YyAFCI2Wzdx//vfzKnclGPvpD7zhSnYezaDzG+MGPJmv67J88tK8cYMQAPViS9VoJZPK5P300QEvOdADTBKwBHJ/63TczLbLJ0uJIsyYgsonHb98cdTbzAX5DYE+OFO7N126y9XwUydxbNhjLeP3h/3zDHj3K3GBM75tfeXqLA4d98nfeHMAwdTDY2mBqg2l+xzG217/+NLqx8ZqDNca9B/OOfRugM1YyU44MR3NU88+Y2x//zhvHeTa3t3zr6OP+IcuXDpm+9/13/MufexK9hzCm4WkAI/189PbuA8wfHTX62Vdn0AVMFH9fdG6kJEEJJt/SAoEbtt0gkwLmzBXCuKD3TmZqcel0wpWW7u0M7fNPHxjpTGjJcdz0HgQrFLGMmVcDIGv+n5/gcOArQQ+K8h3Sv2jN3EaW+qtADdCbV83rNzbgpQbkeUqxFyfWWLg01BrjCYWwjf3kRc6IESph98Z7V14dJD1DcTFkPBpvwWdWijqe5kj1GQVK1s1y6wsGGCfcBJzVHMjVaLr1bfSZRPvrTRbOVvtJZIDQ90gN//yTb8f//R/fii8cLGu8xsrdKL7fu+eTqQygGUDUZMAo1uaRvU1mVGlMvPBi7hn/yuefTMYSHMpxzqh3WZTgumuyBDATN2zAHUdGyji+/+ZXnuTKJ2S0MBmgwQSfb95MJlNeaPaNr8xanN19oZ7BenpRvtGRLJ5j+K999Zk9A5uiDX7jq7nq+eAdV8axNSowRzLY2fhvpJ8//ndeto//9Mt2pItzXNGMNU4SmnIvHZRMueeo+YSOEcwIYLwuOqPqm81XnAqGqD6Ong0FGEQKKbokUUYp5mQq6WMYM8DTXM8yLv+v6njv2rqcTI2AE30bsFpBjceIgvXd1i9AFPAznBAlmj68f+dkom5t5aaZf3QBVXhqbdCosflnKGuvW5p0XjaD0pXx3iweYlv5oZcJHU0jSDRc6dzMekOnQYqeS+gwOX5XvK7oVnC1pCinNeC1frSBMVr2UQsa2x1GUfnevU01mqfPdj3OdgnszZsojWdPII4x+33udZrfPHsay7njz3Gu3zyrJyaOC/d9BeGg1DDO4eDjwyi88zs8sqSGBZui5Cum5BzI9s6v0yYXW1Yk18S8Tjuaevp0t7NMxrwazad3qrTJ1x/9rzfmZtNRaxxF/JEu/tjfemnWEdcW2ycwpfm/HYPcI7QHksKyUw2LdpywlJsFuh3uJovF56XfKFaUB/ZVjlHe7hpzdFtc5BZ035rYxSvRTtZu1iJx6CP8v9hFcB3Bbn8x/bOFUa0F+nrxgZyd8Pbamgmq5oBql2ygWCY8Ag8JBON+uVWlOzaQoWiqp5691xhNm19UJe9RSLrF2qvWSOr+Keb5HiegIPJBTycFWllzYEVr/S6YloYQZvGRBUeEokE0K5ulQq/uFMid4DRGUXwcejpWsd7eZ1sDwO7ez30PO6N0rJglDgXkZLNvvfFsHj9WBaHQOnUwilE3muPdV6l0MA8rmnys/iWDefGKCpkmzQ2jsYwtm9ybTaE0AIOnGUi51qaU+7Iotj0WS/DnFG3XF1RzYiQ0egNojB37I9X9xH9/3UbaPo5954fudhm4lVrreeg1IsFV7JL/MuAmzhTITtupuahCQvtBuhY1E13T7UaVpQrI8xKO11um2sx3bcdESDqmT16S4yFhUCFa/r+2MsWV09w7jl7oJr2y1a/SBbf9zM62ix40cMg61AnG2jcLyoDpnE0vK0shzQVlL0Qt9EGpkOcKHXxnHDvTtSilzRoLbS/2OtezSckVygdu2RnM3ISVGm/vM6xAYsGtuGBtIXYmiWa5kNeOI+89Ctwf/+kXZxH87n1imsd2bf6h739hKu7xAVY3R+Y2GAkL4WP17+69Wv07ACcAHAo7EgFGMLoeDjmOjy0RH/jI/bHaMycxQPAHf+LF7llMNWc6N14vv+uO9Hr3/pUfq5cxVtVGHWvUvT7y/S/YvfubvOlYfbT15bCdAp/5fmdQTt/yy7LidI6j0D/PG/Wpew+ueMHcOhEld5MftoCzmE5HUuv+brMQz0NjXkNeQwkzeFRqnFYSTcg7THQMdI8KJDxlx7Xzuygw25ODdKbNPVZpV+UNGm0YA3gDJV9FHe1NoT0qW73EsrSM/8h0eP+zaQhx0gpzOq059exE9gdyho3Aplr5JYBp4UHgtW9xIg669/CWV4CwzUk6R2jchrw4++jG23ZHl1TgVyznB1hiUuFwFc8rp8wtCMKKW9aIm2C0ikJbl6C4QIHxK/AvQOKdQcDfPceLNjF6yCAsel0t97oQo+fn+TibC5FepNxcUxxANXa9j+0O47xR/B3Hh5OMdPDpAVZ/+vtvGZ+P9dk/fRRjK8Io0v/Y336ZO+gH6MwtEp86itxdw8RIKOZI/yw+9ycP/cMHwHzgKOoPBjHAcIDW6PsoXs9CdOOKs+b0wY/ucyXyJ3/25XneAMxjpdDHdoM/+cRb9sM/9eKRSt2f/40xDcY2/hvfD7ZiC2hwvxR2xVs5DDTkJTh6Q/jTZzmWdx+rgz/x9172cR/jg5ev5v6zT/6fN1g6s1rS7+mTeaejF5WV47wDsFIuH7vvo7Y15jkWRkZ7I1h4xkOn6cBruS7HGl3rDw4D2ePXnW3f7fyKUHrQ6oFBgEm+v6uWSNNV2SX7ynA7bZ4MvHAvTClOePcDWxA/sF9emIPiPKtvKxupWJ5u6cKCJojKxtxqSwP/XrCuvCMGq1VnwBqv6z6AylMJE8CibeLUxuBLgC0wKeZEYSDxsubtZo2Xa/xENiCAsQrg9DYypY5GtbBYg+/Inneyb1G758sApCNNMjrlUzuhvykRrqIM7eR4cXfrCkjEc1mq8aZd8yZj0v7Pf/rRvIn41Q/etXe8dD1Zw2RXj+ZGUPurY9Xwca7IzfEMxvUHR+ry6sHM3vuBcc3VrE+NFa4v/sXj4E3/43MTTbPP8GMlMp4ddeljJW3uUxpfDsZ0gNks+ldBPK8aoPap330rPvrDL+SmywOwhlO/8Y3cOPrW68/GmOIAQeeq52Bnozg/2h3nzDEe57+N/VRyHON3z+Zeq/AT4NMMsOL6Z3/wln3kB8Pe85135lMdhmxe/0ayz9Hn6OPJI7pOJQVHvW7KZNSqqPAjVZ7f7U8zhHwDm2XHSuZgrfN+0LxlaOw1Y8TmFmyo11Y5r4ZJ4JC7hKCun3MOZjA102pcL9DWeQllBVxoX3an805jtCrH7KqxVafNP1KK0c15bQsnom/X+Q27ud+zJKT3rsm281tbOhJ9/v6rv/BHN9ZuPeb0VVTnifjJm3F801JAWlO9BxBsuBa8cONz4a9yz9c8dxvt5AOrfMunAM9fBnDTj7VyDMxv+u0kBDRPqQEPFlRIKVM9DbCIh3IIRq6kJW157xyOm+BKYwA/5ybVMF+U2waOMdEqfWmrVMYps66mNBTGVoR2vfhk2Auqe3OOfr0VcNMTYewMnC7WCuvxOLMBihq8ltfU6HoYk7+3VEugj63/ixpHf/Uk1hIkLB0yr2jgoS8rMHX21t7U45O9ljP7HJ265dduVRLxhkINHJqDpuxwJu9rqKusZBhavdoa24rogTUPxK468vE+n/A368JVfgDzmjXPTGt3oNieawWT7fH9bCfPn+kqFLqDpnNBAAxxShdtTvlnjRLbLaJPquSwx3OXDantAW6btvrTNrWnK4//xn/8+NU1zA1xCXHEuhVTN+V74+RN/u/RrCPzyO7vUZcydRJKGH+4GyWhQyhX2xblnOg36xzCoFi1XSCAYzT0YjjyRcNHk+eYgb4uqQRNjzZjHSAoR7PK4FnrixPSuSIpcTUYfAVg4c0Voy5sYdDCGuASHK1SKekm6hyZe2qmtMJOttbn7K+AcRrtQuOt0q6oiOxcl4c85fcMCpmim+nZGgh9jciGEZgTndbqQ2qPSkC0CYxKGYnCQKhva/fvmcl6LE3Fa44OIXA8BJHoupYYd4G55EhhlOos542HHDbv0ulOYARbLxn5vijLMqsMIkPqCDRKDVIiBBwsSAECSn8REJiumXzLzRrMhy2uEFYoW+CoqRpZWtphsxP+41yI03l9ek3RBVi8gyU3plp0/LkuRCvA6p0vN8ta5d47LG9rt9JwrPzN8vkF3zdaOP17oDZ/pFWMJyMF8WHfTTlwg+NSRfIHPp3f+uqSDI3GVsKyhjU1ISN8J+U242NAWLtoyu+UWeJ3oioR0hXhG2bC+CqCcpyCxpzDHgXQseKZ1+VN/VFGVvWMOqOy7/xJqfn+JkIpFI29iQW5cDp2YdICfjRuBYLgSai/CETKygXbcDoNn56sY/PKCiaF+8aso36wN7qKgYJR0D4u2SFvhucaEIW0GAj7F5livQi1UusrCvUKyEv9Uu9giylzBIjl0j0K+tG/K22bjpaOPEazIz4RoEAOCGQJNEFzS1aU8nFKMiy62VgLcqVTfowSkznn5+zN2yUV3cfJG1nfnCC/c1tFls26hTYStO0i9HuawXVpyNJMsxE3cQSQJxhKhgymfi6PXoxv8M2NKATpbK7JVkJmYNUNqOZyoQklKxXsjlGPONCuaCipqA+E5gUyJYbVynIHMgubK4tVWmKmlMFPNYoUbACHEyCRbxM83NZu3QovWXSTAQsi19Pd5L/MVLwjWjE2phvQuSs9zp9Rpwfurf6iWk3UNZRbytyn1+dg1J4VMHCkYhdRgEOZyPbB0AXbaNqMWTOfu06AE3pHAf3sYkNaomHZueApe0jQYVMIPFvFDAVWjAnRA9AlFdJWas6Sd6lvxQJn/wmxy48HpydwtVpgCXvbxfKw/S0HloGHgJYTSpkoa8i9jvPcncKGvwmMyGaMKGcVRwQK0Wi6LxjmJ7YpAwXLg51Fs5cUBxhUCQhCoPwimZbVKLpErzXKVnaxVtahpRWwQVljFYU/WrphXt3daQmcQdQZLYDNnqYCdsufcNQ8LG+nTkUhrS3gqKkU4Ex7QKNeZMCEe82B+GWOY6LoAlYKOJUKWol0hPhW5N9NJru3qMMAko5E0DHvLdGi20VY/+79EhWywcD5TnPWY245BjmW10CUTJSSw1qqu9arWmooNZ5kT/UZDTUEqskIXFOEpymDbwYbClzFSqw2qJ6DCOQjkoMnCiRQZpBzPu6GAatEcxoboiS+8U6cym4khtI3JkG1hBRL5tGcfgLyhA8E/+bkjNZNr7HoGwAb8CKOAYxSjFo/exe6FIBluaUlSs5hTBOV6lGPwsqArgJlmwWXJKAqEaTf5SC9n2imAFdmay0NDF+EjCvce1cXLZ430rRReRWxwdu8NR0I787yrZABCailM21jCQ+oNopxV7hsCGP+HlsqG4Zq2Dnmk8pPGn7jkb9IXkAid4oyzBq3GaMaHZ9CaUwihSNWUD/73pWk3tRsOm56NpyExipem+dq9dJ7DTznprBEwPCaW9UNY/G0UmCKOn81OHXuCZxLsXlfnb2i3OK0IYOJvPfMrAUELlphhAIA0zicG8CLwWITS5SCfPz0SzbNiL0WmtsgiRXQV+nCW/IGcFQa2eKpMT5WYw3QyFyKDC3o6RVf6Y3p/G4tCEYuPoUvujFbA1YjUogvxPY+2SjEakYW7G7cFbIjy27UZE0HwSHAmPK77H0Wzhtg7fShVGooRQUoErhyqwFZpyvadPBrqQ/SsYU9RYtnPdvQ7I8V+CY7QIxVMFKATYFbf7UtD6HQvbAUsHUTizZ6T08uWvPsA3KHpnChz8dq71G/6T4CwpaRfcMt0eMSFB+n4foOmK4EA6YE4c/uuoETxsOXooHSu7xA+kPtao9uwrZiTAXcSj2aXFHUDm3zigQuoyF5UxA4J42ENH+OyRePagvPtSIHCAB4lUPi3JYmeqU8AOVdDh2ak2qKUdAz/uLRvnmGxhWSSe63ammky7CnqjIgRdmSCHco65cSILz5xwF/oRSakle9zKxAjsaeoBGLievcXQCsWdSPRwCAufmRet07kwYSONlSYAhexhCrihlUVSWBPSyLL7GCWWmlNYvr8rcsSiYBNydg6fwIq/1YVlkBuL/Ajf1Gpfk1L2JSlHObrSht1nzAYolApaN+TXlBAbYtDkbt6IomX5xzC9OqL7Nam0BMAoCephQ2dDD0gkfGFmPAN0IWku82BhZRtz3Z1HxUzZ4/VDpzQwMyypqjgp4wW12VEXeD6A5tRWntBFAB1hKg4FUmCy84Ko7LsRn9Eb/0W8ZtuUsavxHnZsUMi8a7gCdFjQKnMbNSLQeWumBwln2cLlIRjdcw5KIsofC/03HIqhSLtPgQC5VgLdIWCwxNk0JsOqg5NyDurNV6zYqT1mobD3kb2+rb6g71D2i153jWCYHATBO+IXM21SFxJuRlUfk8GHaVFJqcAA513Jozs3Qh40QhP1W22wkIyq4LNHSrSPle1qISYDpeBJSRKFlZxPy8w8Ct/TXcEbXWxzgYpsApo2C7or1u1izDFx2dJnbLK62fbTDmnoThp7/j0TSp56qEtTiF7Qa9l0pzejF9nWY/O1sdBzP1S9T3+duG+Q/2TMx8B3s2GRFmI7XPMRvzxgwcg0zbLT7TnMeKPiwOKgWZIqGS+EB3p1qIxfIJEtKe/rAqjhrYlcsq617XMnjjGNm6+2qzrbDe+yXnuIlyBv56fKwhS6iiinjFurbswpCsNECMRuzIM2WXsDCcvTY3NtH37lsdB7I2TDxaFkXgsNOrGTEiN+sROOiQNVSNdLyMwhb9WhHZQE22GBxXSQEFvijasiqVY2C7QiZjuWTxeUi3g71LWVF4GNF/nPX0KnYt0MB7R4ClT4bqXsVgA/uwAFj5Y9RM9+puN2fKyQ6D0wnJvoFU5LxIC1SrNLtt/GaVBrsXAGbA2cK6XzV8KVPyBYyuvXmx+aLoEjtHHT29nA2TNdaUzFaWqGhPn0hHm+lgJEUbv7Q28Wr3jHLz99hy82novjSrQjzGsMtDgNbenMKjkbPGfiwEAmw3VGspXAqjM9fKNlEMxo86GMBNxZ7gmQul9oVxEKJKVBVJEwaLcTDY18C8p3twpZsGflxRnQcANHvBK/5Z6jvGWVGRTSYYYEDjOQX8yKpZyxflhCXqdREDZwVHB0FUujeXZRyG1LvnoNCLt6giBqTCSIEfxwUNoA2uTI9aW0inHBD3nbEuklVHtbDMU+St2ujuU1FRU5k93tBU2Kon66tkUe142qEiabB8FASXmhanSr8PDgGRKLPnvbGpWFipCQBhrdR8AOSjAhtwM8/F3hO79bUCFvzRWlKm8ZqvsjJrLKpQZv6EWFtKsfLIiOqF13ULzkn40jSVIEMwXTfrvLkjdf7qn8wcEXLHrznPh5MCqLIGKdCYo9xF0CQSYHIqNsFqPpDPiilxl3EuK+VNknjYmhWoqBjf1sXxVRmtu3X1BCN9LAJaRA4nwGB2OSgdX+DFVeI4XS4nVERysoqy8RwN/2Yaw19ythZ+hQCYXAiQYzWjBXSqRINqQRi5wlxBcS9G5VYklnUXWQ773zUvookK2UlEljS1CZYOJcnQ+d2ax/YUt9k7CGXBjgwoGhceWhpFcNZEJhPaWDOzcpdcto01SosyButl4cXUAtc5k4AwsqWG+Bi7p70E5hqtnBAEAIg4XO3AFbI5/GbtHknlgteN8LArT3K0b0yLI5qF2ZKyw3JQt6ST8oTTfs8O24zh2q7EthYTKTShgfIQ3esakBc5gIhtO3keVR7Z6bZJtw0GTUFqYlK0wGVtLpkCzlsINmyXGOIYK4zcLX9j2gSJ5MsY9ARxoK8BVkK8UBkNP/JtymVdq8IyQhq0dgtANkFTg/8VaJSVU2kZMdy4b2csF+7A+OBeHNY7ZKA9OuQXvKYFVKUUlfJ2R2xIxZjP0oaLAVlY/XoLzqpWETO1bIKNlyrea9lT5uFWTKCMEauWsUcnT80u/DTvPLo8GgrzgKfxOwImZC6H51BgGlFg6kVLS8M5TtoOMDfHWFYVfXzqlVQGmXGH+1OWLAn3/ojpu/TZzt1FFS06fJm5N8LTI1j+ZQAlzlT9LUwydG0+NbBmtgjn2SVkMKnIaF0AVaUCnFeGZeV8FZSNgLVBQBcvpoYlRwyAbcAUBS2q0tJlUqzXSn2gxIRJF4S3W3es0Tuew2TDoYgsYYLUUm3mLV8PIQGH7jvP2nnfIdzKE+DcK62Mluqp8B+KuZWncZANuF2mBXOJkgUJp5Bf5y4gA6n2JfuA7I5rb3SNOghFmR3tFGmjbluaR41WMVFGS6CUASxRQ1sW3Dplsga4pl/YMxaD4fSOHCX6VglFV7c21l43FHCB4mKELiMyTah7Og4RFVN3AvkiKuYFnOixfd/61ymcJvqM5iL1YvsYpNsKb1MI1i+tJ4V4ObXS3ih/dpo05GW2CkFfSxa0CV0GnVadit9rewxwrC1YRAEZERDgFlayIubGwgwBYvSFVogPIL/QJaOIpulLja2dYDDDuVOgJlByIYOmOqA715BaWpCVJFuEaNclSNYGjCoselF+36cAyXuvybdYjKLSOBVLx4rz44QNu9oj00EmWHhAHL5KpSttKDsz9ihMzh5zX5Yh2jSBMv2ToGJFpuVYMxBHzh58D8HDg8lCZuIpuYfp2mbcTfTdxWAnYkmaC0QPJRfVsAob9aDMNq0yDtX/pDKBj3l0FDDKT/OzsocG212my7zErppMZsDnY2h0votiBlM/XqM629pfbd1AQ+HnWhmub/IUyLoJ+DkvYoZoO+ZqrS+HkLONVpCAnhCTO6YGLV6+knyPP24lJRiqi+FtTNnT+LdqtVaBlbJvrMr2lQDpToTQ2ovOT7875LtjNy7qGpFUjAZfrIs2GtIxsBvfKOGIbl62CkmzbTMxkt2lpCBU1wV0i8r72fW1LmjpVVI2v4gCFy+KDLLqNTPWMhCdlfWOS7b8rcH5660NLQGYoBywumjj2hX1zKzguqWF3amc7uu48djLEi6mYZ09WYvkbj2fZ41E/KRHfBO5tHZ+VB+UzcoIYg0MZspJCZYX50C/u7X4ZG3BqLUdC1gKNH2VgUMP0FSrzwqouWkF8UgNyslLXtGCwMKqC9VocrFbAd5up311NTznmMywW3+vz8mC4Oyu1JafZWILMz3L4Ox4UaRHArYegNjuqvH5ql/gi1v7grdUU82urMKM2LSVb4thhZB/OuzeCIZltMBXeXzPpzikNBPWvMdtRgyzmrDmQ+EWnRHCnGuHt6kPjZhQjjo4A1YZVcj/c3rJTAD814Vpzd0Jbek3KTNUj5i3dAeK+hlp6IAgmlFgq26nUHbe0LfjKKXAhof88FvpW82Yzs7TIzcq4QtvLMzK0VuzC2OnX5mJTlOgi4EFp8y5Gh2jy5vfhQDJrY0YX0UGcvdKP5ZX9/Vu6EUoTcZJpw/V+8Qw2+JwG1sbiRxCPhxSqVljV1EThFrSOLn1waxMFundvjpZdwyxwNZqx+Cqx53lAtg0GTITYSkwdK9iVGSTOUW0jardMgrEXSxeab/kWsOtqNXPaRPih7q2TxRdaszdPlKsXgGfhIP3iEqJWKTQmGYwDwFpUmRr8okTCnHhSDUsw+55GgfGAEqXBfx0Mpwfyu8WGZAxRrcnKN6bR6xoaasYosoCszNOxyTja4KvIVp6ibNaSoDhriDrj0GxlHa7cdWs3+8zBrxzIcbbNTDQQtvcKrJhgTlw0/ROnuoEsRprVdcBecribJmkNDi9vlIDAY2+NSCL6ft5nLfny1hxYlw6GK11797nttzakqDi1umVwxhDO1kqNdTz1odk99LO/Bk2pWOuVEHo3G/tKVm0OZSvOSvLBAauKHn5h4DSCuGaU9gZyBWJcwxe0FvuWr/F0DKwxeRXbw8CprODaeHuuyDWeS+o4AYWA70uPpNizZs0qKMEt2x+Yz02F46KgvawV7G8xrpTek61G/U0520aD2RD/AXWKTAWq4TI0RbTtbPMPdFI4GO9now6VIEPx4a//Dxn1CIIQzbAqnDcW71a4aCs3QAYFh3VL92mtbdFySkVbixVQHbXVogNRkEqHlQ2cU9sQw9h0L5UOTAgtiLmsrqwW6uSW/veEp3hMdNeN5P68nxXimiLJFH7p/OWPEtGXsZsrQgdSyRYHHmthxlwBJTbva0c9b4SSCGVGk+0vjT4ClVlcClTfmTY8gpQUYw15C8QPBkS0zMoL0isel2oAQcmsnst8C5zCmJYG3qlxbebX6sBkW24SFdc1qn6PKwKKnOuES3ACICn5zGuuFnta4OUURLowccQJL10GsgKEDzdVNYhkVTN8KZSIbXbkKIzp1a5iN1WNrbO2VRzd30dpw9GZjNHrDidaH8ZgCjlEKSV/9TTA5eyBf7TudZ9TiiFUgU1AyLUa8OaN5iWtzAg0mBml2YjG90pX/kWVhR7EfNc0zKBPcIEDqiawU6cSWYDISSQTtbQjIq9QMNarZh/N2J69pxf5LPWXOMOpRKh+pfJuMde3yT32GzVJKnwuRVUrH7J8a+UPQ3XsTEzFAoKZ/rkxmvvjhUAFbQVaqubNj1B9SkqNSpoAAvNuIdyt9pDhCHJ8HgbavuhTod5NUNtUSU/T5EuT0yx5aWxbdbmjlnk3UozoKTs9wXxMQ+kYHIwuD3oYfDakDXOg3qSgVsV4BnBPIvcN8ZVWBNLUaCgjvgkhBqPCB3SFzz9s4KA9mVgqaUNcakVQvW3lCZikVN4pVUbbYGydCneOsjCuvvYlf5JdnEGLJohC+tRoGMJRtzfEGHekaTvJ7LbU4ncSOrdCuTb3pzcrMPx7a9YmmiATYXKeNpF1wrJtqAFL+TJrgi4YUtRmOpzbuv4S2UqsfObjiaMWlbUseGFLAsNKNznUqprpU1rB2zfUSqzGlZefwM7ldfxjjoAbt0wzcMBBTkNkbS32WcTM9/RYcZL9x/GuQ4WUUZaKVlBVZjAuS5gX7tkuQShXGZWdU8WpPohLm+ELlxS8Ub0RM3gFwgE+wLrw8YzWOxsd1n6yvEZnU023IxTThi+bvVVJYM92dlNUqTshDJvQNCmiCuqiO1Lua0YRKm3Li4PztjVAsYuhFIBu6U31XnDlwm2/cctMNlTp/wMeTCqtL4iRG0AOBQF9uftfVqQcVLp0/VWq6gnd262p1Jbx6HyXHLiSg3PgBXWNbqq17sEigiF+IeXcq97WsRYNYNYq7nQIwlcKXhvM1Qni1+whI8hoQvPW3NclTaraJT5tm/WaGwpuhw0yovmqTuWFlygPHbqbsyjZIx2y0wQiBePKuMXfZPcvCGV/nVCLHCo0lpzPOBOiAO3WIKHl8EJsHh6O68Bn8NhKp33fj4eWaENlEHURbNtL51onFhqA1dl/WVia/poVgbEJQDUnS7GzABhi83VHCtoKFZ6c3YBmqVeohAmoFfG/5w7r5C7aGkxGnNfJqGohgynGYPvApPV36K14D1d55SZdoj5WGMUKZ+94LKvvhLuBUKs7bLriLMqyh5yv68XYOHcXepqgAW5q94Fatjsj3a5YM/8Uj5NqUlXdvGi85yMSEAfrEi2LRPM/nAunlzKYqEcTfQmYCdAMrNepdKyQAuuHbgk+/FkkHx6S+wFFNId3S1bl/M4HcbslrwOqZWFVsACAskBjWjmS4GUBkkQpCO331RWeDTL24F2W2bn8A9EWFBsnDO7Tyz0JhBFYLQvlTEkm95HOfqiz2UQBg16eXO4VYwxOkYy4dLlvodQtutJ5hUt1dgLjdfel5dffKZLRrP3ruwic6e5zkhtmxdyT8fjjNdmuJ+P8hPKcxzRmLweiqpbc6IRvRIqR5My3Xkmq2oQh5fs8gKBCsAnTdPd4gLd0SBvwhK4C2OttiX4GU9vqz3ZAlpw1rClZhVWYG7tuAypz38NMp3BAZDdFtIrREP1MU6bbKIJi3ev2EkuLhawJxnaq+yUlSMxpXnhWD387HHwI71jU15AZfkp0KFy6eTYgXJml3FZKS0ENQ/146eJC+HsnDG7cWvEOtcm7yiBk2y77b0IC7bpLtrRYnAFrzmIxAM8hInRxNr8puMw/7VyDdlcLMv5Zr56cKa0oeeUwM/l6bXxzmnU1uwP+5Ka8p2T1DJLPv3TcWd/j5iR0+EPcc7UeD87WLNOjYIsp/SQyJChZ3y5uffwH3ICRicAR0+r2sl5D7Mb2ZAxz3LD0wqWUbFM4YY7Agp6tCG4D0SsQilpm69TvqT3YU1uinFRo466MvUXklXJM+ew72U/udt09d8lqzrJxRalzG7KbaJ4DRkWmWQebwC2t/hEmwixMIpZ3nEGRQUzZQPNvmO172Xbhgtw82QAGSsQmXeVPAqwGnHO96+Nz0d66J84rvwwuvN1CdOCC20wHmyYa9bQZhRshIdCq3naKyxmAMmZAk0NeGFeMi5GC29br+XwyEGtFE7wshN7CRZg6UWr8TZrAkpA56ocwbaXCBVlRLzWbalB4R33JlivVSwyKdnZhYDb+wUcff06m88x7O2RrFNEYJhtwAIZMT+CbDupj/E0Moosbbr27cQi3zJxgvEig2Y9kfEw9VvngtHEpTP39KYElBa3Sm2ZUXeyxU7aNX4SqqUMbVnwieb4CVBRsdHL5tfPpkyV8o2TGVVOs0GGchSOsey86iU5oPPEg7qqSNvHVeZ8CVgru0Mzdnr54hAM9IZimESXh5FwgPeUcPvcvYdMGEf8/vh7bfvNb5pv/8j7kOgM46fA+dAmI7xEI0QRRUNU/TUhkDVRzGfKW7Xg1SLn6ngolC/yXqIhNewIlh67Lq/0SuW2XVh2IXeFOFF7MuaOu/mZOgZzsfWVnhfWgDPDZmPG7adYSt1B8S19mXX1Ny5YQ1Y7qEHUvClAZ0g2VJwDEWffRaLXZfvswlVHb3pJWV+EKXLGUJhh0GlTsZ4wuLWaGll/sL7QwISBc7Ghxkqt4CeUGXoD2CaIKJAw6qCMwZsVG6ogaIM0RLDm3lmII73jQ+ygLT1znljd7S6FTsFGgBGgjivfhfSqOB4SQ5wZGPSf/wiAlN1QgjWqtE3V5xrGsEWCJwA45M/n2Ew9ZJDWea6soBsycove3TnaGg9LZW3u4/3273X1r/78H/wn3/xn2og8I7gMMnd9lo+xN2/vKkPEMV/nJyPhPievfF4O721O+bacck1PPNaRhC+dNHrazMAqNYmKkkKpMyCpHFX93aq1RQxleLe1ZW1JtHlQ/946+wt919ChyyfbIQCy7aZ0N6sCtFI7ufV5JmY16fDmcBfz6YB+69jtQlhNhwWYrN9Mx23t+8p6Kji07RvfbuzR/7YUvHRvlZesXS243efU+wAGduAWciZy1HcuXZ/T0rWP7lgqB1RpIc5MM05vGDyTzdtis5FLzutCi1kD8bjleGJ9E0bUeDFTYVn5HTW7ejR+EUIMJ0GpRYIGWDJ5fvHffuO3P/5z4+0sxL/wjge/9PDhw/98NPKjkgxy0UzQLaxVBl2FLeN6kWVEjyakwq8c/lFk3TZG0A5CTszqwpTuW01BkRQHFqBuPXc8x3PKXbEqQsOSA4VWhk5OX5koZjh/nKMDATvfT052u/MUnnIsMk5rhtkcIDpxpwFRbuyXUsw2G2DxVfMR6mHm58hdqCiZQTl+65Syaw3BTt5/AsCaoLSI6+f7fZ1/WBW0saM3RIdb+74easke8y+l4OxA/Zx3hy92eAvAxHLctW+M53d5li24ItNZfxwvGeRuVFFLV/l85oh2KzF1sPY13uwllpa6z375QwgE7RaVOioJHL3Ff0k7W4i+kp1e1vJJ06JdUS7VxnO1rdyfdNe9zcbFGY+v/+LZ/uSfSCvWXv/0F/7w148/v152OgGgoHLDOmhWtsjw+8qVN7xSB1VKTokspzj8nxKy9drbPqzHqVBLSfqtbMk7aF9Y+cX5xUZ0LC5Oq35qmdgayXHrKHUrG+nX3T6auO04EwBF4edF73aFZnPJKG5/ncZorQVLbFxk7WUEtw/a2sXf5rj/NXOJ543vlvGexx4MSgsyrc0+98AtIxFrWcfM2tVzr1t00e2IU1vPjgVRGVOsdXdqnRE+VmZVpT9NIFhCiahuLtSnDpe0zYsEJRaeShtVFHN4kJAkOl5rulV41yy+dRVXv2FvPf43/+q//sRrdot45uvX/v7vvStevvMzB1z/aD3vx8bv1c8/W0kKQGO5wXDbam15q/OWuR+j2nZbv5wpwT6eDLmci59B9NksNmjWJefXlsLf+me1dOSDx+etzWX5Hufcdt25l3V81e9tYzkf07x7X7e9XzqJU6/+3HM59g3zpTw4dx6zJov9241hm48x2Sh36mG85bFFrue2+lxva78fy79zuMf7jb/wfbounx76vDbPurttDM95dRlJNn/dRbwGtjpkss/xpS1ftHceT5/7kC1ljc9tLhs+L39rLwh+MnSzPtf0GWw00hMXl/4c10yZr2PL8e6Lvc2/dn6R2MNPebGV3XLT0LincJ/biDjAeRYvbGbu+Zj1z25vP/utDlZ8/X8Oi+Xb11VKhQAAAABJRU5ErkJggg==';
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      // Show the form when Image is loaded.
      document.querySelectorAll('.form')[0].style.visibility = 'visible';
    };
    brush.src = 'data:image/png;base64,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';
    
    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('touchstart', handleMouseDown, false);
    canvas.addEventListener('mousemove', handleMouseMove, false);
    canvas.addEventListener('touchmove', handleMouseMove, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);
    canvas.addEventListener('touchend', handleMouseUp, false);
    
    function distanceBetween(point1, point2) {
      return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    
    function angleBetween(point1, point2) {
      return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }
    
    // Only test every `stride` pixel. `stride`x faster,
    // but might lead to inaccuracy
    function getFilledInPixels(stride) {
      if (!stride || stride < 1) { stride = 1; }
      
      var pixels   = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
          pdata    = pixels.data,
          l        = pdata.length,
          total    = (l / stride),
          count    = 0;
      
      // Iterate over all pixels
      for(var i = count = 0; i < l; i += stride) {
        if (parseInt(pdata[i]) === 0) {
          count++;
        }
      }
      
      return Math.round((count / total) * 100);
    }
    
    function getMouse(e, canvas) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas.offsetParent !== undefined) {
        do {
          offsetX += canvas.offsetLeft;
          offsetY += canvas.offsetTop;
        } while ((canvas = canvas.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 85) {
        canvas.parentNode.removeChild(canvas);
        $('.cntext').addClass('cntxt_visible');
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(brush, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();