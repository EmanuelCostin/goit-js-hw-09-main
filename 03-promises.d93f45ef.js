async function e(e){e.preventDefault();let t=e.target,r=Number(t.elements.delay.value),o=Number(t.elements.step.value),a=Number(t.elements.amount.value),n=r,s=async e=>{try{var t;console.log("Fulfilled promise "+e+" in "+n+"ms"),await (t=n,new Promise(e=>setTimeout(e,t)))}catch(t){throw console.log("Rejected promise "+e+" in "+n+"ms"),t}},l=async()=>{for(let e=1;e<=a;e++){try{await s(e)}catch(e){console.error("Error creating promise:",e)}n+=o}};await l(),t.reset()}document.querySelector(".form").addEventListener("submit",e);
//# sourceMappingURL=03-promises.d93f45ef.js.map