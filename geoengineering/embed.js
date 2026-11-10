/* 주소로 방법 바로 열기 + 생각 노트 안에 끼워 넣을 때의 작은 화면 모드
   ?m=space|sky|ground|mammoth|iron|deep  → 그 방법 화면으로 바로 엶(첫 화면 건너뜀)
   &embed=1                                → 작은 화면 모드: 장면·세부 방법·강도 슬라이더·작동 전과 비교만 남김.
                                              다른 방법으로 가는 메뉴와 설명 패널은 숨김(설명은 생각 노트에 있음) */
(()=>{
  const q=new URLSearchParams(location.search);
  const MAP={space:[0,'iron'],sky:[3,'iron'],ground:[2,'iron'],mammoth:[8,'iron'],iron:[10,'iron'],deep:[10,'up']};
  const m=MAP[q.get('m')];
  if(q.get('embed')==='1'){
    document.documentElement.classList.add('embed');
    document.body.classList.add('focus','embed');
    /* 세부 방법 버튼을 '3D로 보기/2D로 보기'와 같은 줄로(왼쪽에 세부 방법, 오른쪽에 실제 사진·보기 전환) */
    const sub=document.getElementById('subtechniques'), bar=document.querySelector('.scene-toolbar');
    if(sub&&bar) bar.prepend(sub);
    /* 세부 방법이 하나뿐인 방법(우주 반사경·매머드·철분·심층수)은 그 자리에 장면 이름을 보여 줌 */
    const nm=document.createElement('span'); nm.className='embed-name';
    const title=document.getElementById('title'), put=()=>{ nm.textContent=title?title.textContent:''; };
    if(sub&&bar){ sub.after(nm); put(); if(title) new MutationObserver(put).observe(title,{childList:true,characterData:true,subtree:true}); }
  }
  if(m&&typeof select==='function'){
    document.body.classList.remove('choosing');
    select(m[0],m[1]);
  }
  /* 생각 노트에 '준비됨'을 알림. 이 신호가 오지 않으면 생각 노트가 원래 그림과 '새 창에서 열기'로 바꿈 */
  if(q.get('embed')==='1'&&parent!==window){ try{ parent.postMessage({geolab:'ready',m:q.get('m')},'*'); }catch(e){} }
})();
