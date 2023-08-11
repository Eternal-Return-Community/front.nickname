const nickname = document.getElementById('nickname');
const text = document.getElementById('text');
const listNickname = document.getElementById('list');

window.onload = () => {
  list();
};

const check = async () => {
  if (nickname.value.length < 2 || nickname.value.length > 16) return alert('Nickname too small or too big. Min 3, Max 16');
  if(nickname.value.match(/[~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\\/]/)) return alert('invalid nickname');
  text.innerHTML = 'Loading...';

  try {
    const response = await fetch(`https://erbs-api.onrender.com/v1/check/${nickname.value}`);
    const { result } = await response.json();

    if (result.decay === 0 && result.userNum > 1) {
      text.innerHTML = result.nickname + " Probably available!  <brthere is no information about the last game of this player";
    } else if (result.decay === 0 && result.isAvailable) {
      text.innerHTML = result.nickname + "  Available now!<br>";
    } else if (result.decay >= 1) {
      text.innerHTML = result.nickname + "  Available in " + result.decay + " day(s).<br>";
    };
    
  } catch (e) {
    alert(e)
  }

}

const list = async () => {

  try {

    const response = await fetch('https://erbs-api.onrender.com/v1/list?size=100');
    const { result } = await response.json();

    listNickname.innerHTML = '';
    if (!result.length) return listNickname.innerHTML = "No names available.";

    result.forEach(account => {
      if (account.decay === 0 && account.userNum > 1) {
        listNickname.innerHTML += `<br><span style="float: left;">${account.nickname}</span><span style="float: right;">Probably available!</span>`;
      } else if (account.decay === 0 && account.isAvailable) {
        listNickname.innerHTML += `<br><span style="float: left;">${account.nickname}</span><span style="float: right;">Available now!</span>`;
      } else if (account.decay >= 1) {
        listNickname.innerHTML += `<br><span style="float: left;">${account.nickname}</span><span style="float: right;">in ${account.decay} day(s).</span>`;
      };
    });

  } catch (e) {
    alert(e)
  }

}
