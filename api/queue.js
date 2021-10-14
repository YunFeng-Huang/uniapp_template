class Queue {
 	constructor() {
 		let timer = null; 
		let loading = true;
 		let waitingQueue = [];  
 		async function execute(task, resolve, reject) {
			timer = setTimeout(() => {
				reject('超时'); 
				timer = null;
				const next = waitingQueue.shift();
				if (next) { 
					execute(next.task, next.resolve, next.reject);
				}
			}, 3000); 
			loading=false;
			try{
				let data = await task();
				console.log(data,'data')
				resolve(data);
			}catch(e){
				reject(e);
			}
			loading=true;
			clearTimeout(timer); 
			timer = null;
			const next = waitingQueue.shift();
			if (next) {
				execute(next.task, next.resolve, next.reject);
			}
 		}
 		return function(task,config) {
 			return new Promise((resolve, reject) => {
 				if (loading || config?.leaveQueue) { 
 					execute(task, resolve, reject);
 				} else {  
 					waitingQueue.push({
 						task,
 						resolve,
 						reject
 					});
 				}
 			});
 		};
 	}
 }
 const queue = new Queue();
 export default queue;
