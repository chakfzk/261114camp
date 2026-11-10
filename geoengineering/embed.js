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
  }
  if(m&&typeof select==='function'){
    document.body.classList.remove('choosing');
    select(m[0],m[1]);
  }
  /* 생각 노트에 '준비됨'을 알림. 이 신호가 오지 않으면 생각 노트가 원래 그림과 '새 창에서 열기'로 바꿈 */
  if(q.get('embed')==='1'&&parent!==window){ try{ parent.postMessage({geolab:'ready',m:q.get('m')},'*'); }catch(e){} }
})();
