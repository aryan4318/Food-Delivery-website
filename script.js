const KEY='foodiego_state_v1';

const seed={
  user:null,
  cart:[],
  orders:[],
  restaurants:[
    {id:1,name:"Spice Route",cuisine:"Indian • Biryani • North Indian",rating:4.7,delivery:28,price:2,distance:1.8,popularity:96,emoji:"🍛",veg:true,tag:"Bestseller"},
    {id:2,name:"Pizza Planet",cuisine:"Pizza • Italian • Fast Food",rating:4.5,delivery:24,price:2,distance:2.4,popularity:91,emoji:"🍕",veg:true,tag:"20% OFF"},
    {id:3,name:"Burger Hub",cuisine:"Burgers • American • Fast Food",rating:4.6,delivery:22,price:1,distance:1.2,popularity:88,emoji:"🍔",veg:true,tag:"Popular"},
    {id:4,name:"Wok & Bowl",cuisine:"Chinese • Noodles • Asian",rating:4.4,delivery:32,price:2,distance:3.1,popularity:82,emoji:"🍜",veg:true,tag:"Top Rated"},
    {id:5,name:"Green Leaf",cuisine:"Healthy • Salads • Vegetarian",rating:4.8,delivery:30,price:2,distance:2.0,popularity:77,emoji:"🥗",veg:true,tag:"100% Veg"},
    {id:6,name:"Tandoor Tales",cuisine:"Kebab • Tandoor • Mughlai",rating:4.3,delivery:35,price:3,distance:4.2,popularity:74,emoji:"🍗",veg:false,tag:"New"}
  ],
  foods:[
    {id:101,rid:1,name:"Chicken Biryani",cat:"Biryani",price:249,desc:"Fragrant basmati rice with tender chicken and aromatic spices.",veg:false,emoji:"🍗",addons:[{name:"Extra Raita",price:30},{name:"Boiled Egg",price:20}]},
    {id:102,rid:1,name:"Paneer Biryani",cat:"Biryani",price:219,desc:"Aromatic basmati rice with spicy paneer and herbs.",veg:true,emoji:"🍚",addons:[{name:"Extra Raita",price:30},{name:"Paneer Tikka",price:70}]},
    {id:103,rid:1,name:"Butter Chicken",cat:"Main Course",price:279,desc:"Creamy tomato gravy with smoky tandoori chicken.",veg:false,emoji:"🍲",addons:[{name:"Butter Naan",price:45},{name:"Jeera Rice",price:99}]},
    {id:201,rid:2,name:"Margherita Pizza",cat:"Pizza",price:199,desc:"Classic tomato, mozzarella and basil.",veg:true,emoji:"🍕",addons:[{name:"Extra Cheese",price:50},{name:"Jalapeno",price:25}]},
    {id:202,rid:2,name:"Farmhouse Pizza",cat:"Pizza",price:299,desc:"Loaded with onion, capsicum, corn and mushrooms.",veg:true,emoji:"🍕",addons:[{name:"Extra Cheese",price:50},{name:"Olives",price:30}]},
    {id:203,rid:2,name:"Chicken Pepperoni",cat:"Pizza",price:349,desc:"Spicy chicken pepperoni with mozzarella.",veg:false,emoji:"🍕",addons:[{name:"Extra Cheese",price:50}]},
    {id:301,rid:3,name:"Classic Veg Burger",cat:"Burger",price:129,desc:"Crispy veg patty, lettuce, tomato and signature sauce.",veg:true,emoji:"🍔",addons:[{name:"Cheese",price:30},{name:"Fries",price:69}]},
    {id:302,rid:3,name:"Smoky Chicken Burger",cat:"Burger",price:179,desc:"Juicy chicken patty with smoky mayo and onions.",veg:false,emoji:"🍔",addons:[{name:"Cheese",price:30},{name:"Fries",price:69}]},
    {id:401,rid:4,name:"Hakka Noodles",cat:"Noodles",price:159,desc:"Wok-tossed noodles with fresh vegetables.",veg:true,emoji:"🍜",addons:[{name:"Paneer",price:60},{name:"Chilli Sauce",price:15}]},
    {id:402,rid:4,name:"Schezwan Chicken",cat:"Main Course",price:219,desc:"Tender chicken in spicy Schezwan sauce.",veg:false,emoji:"🍜",addons:[{name:"Fried Rice",price:90}]},
    {id:501,rid:5,name:"Power Salad",cat:"Salad",price:189,desc:"Fresh greens, chickpeas, corn and seeds.",veg:true,emoji:"🥗",addons:[{name:"Avocado",price:80},{name:"Paneer",price:60}]},
    {id:601,rid:6,name:"Chicken Tikka",cat:"Kebab",price:259,desc:"Char-grilled chicken tikka with mint chutney.",veg:false,emoji:"🍢",addons:[{name:"Extra Chutney",price:20}]}
  ],
  users:[
    {id:1,name:"Demo Customer",email:"customer@foodiego.com",password:"123456",role:"customer"},
    {id:2,name:"Spice Route Manager",email:"restaurant@foodiego.com",password:"123456",role:"restaurant",restaurantId:1},
    {id:3,name:"FoodieGo Admin",email:"admin@foodiego.com",password:"123456",role:"admin"}
  ]
};

function load(){let s=localStorage.getItem(KEY);if(!s){localStorage.setItem(KEY,JSON.stringify(seed));return structuredClone(seed)}return JSON.parse(s)}
let db=load();
function save(){localStorage.setItem(KEY,JSON.stringify(db))}
const money=n=>'₹'+Number(n).toLocaleString('en-IN');
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
function toast(msg,type=''){const t=document.getElementById('toast');t.textContent=msg;t.className='show '+type;setTimeout(()=>t.className='',2500)}
function showPage(page, data={}){window.scrollTo({top:0,behavior:'smooth'}); const app=document.getElementById('app');
 if(page==='home') app.innerHTML=homePage();
 if(page==='restaurants') app.innerHTML=restaurantsPage();
 if(page==='restaurant') app.innerHTML=restaurantPage(data.id);
 if(page==='orders') app.innerHTML=ordersPage();
 if(page==='checkout') app.innerHTML=checkoutPage();
 if(page==='account') app.innerHTML=accountPage();
 if(page==='restaurantDash') app.innerHTML=restaurantDashboard();
 if(page==='adminDash') app.innerHTML=adminDashboard();
 updateHeader();}

function updateHeader(){
 document.getElementById('cartCount').textContent=db.cart.reduce((a,x)=>a+x.qty,0);
 const nav=document.getElementById('mainNav');
 const u=db.user;
 nav.querySelector('.profile-btn').textContent=u?`👤 ${u.name.split(' ')[0]}`:'Account';
}
function homePage(){return `
<section class="hero"><div class="container hero-grid"><div>
 <div class="eyebrow">Fast • Fresh • Local</div><h1>Your cravings,<br><span>delivered.</span></h1>
 <p>Discover the best restaurants near you, customize your food, track your order live and enjoy every bite.</p>
 <button class="btn btn-primary" onclick="showPage('restaurants')">Explore Restaurants →</button>
</div><div class="hero-art">🍱</div></div></section>
<section class="section"><div class="container">
 <div class="section-head"><h2>Explore cuisines</h2><span class="muted">What are you hungry for?</span></div>
 <div class="chips">${['🍕 Pizza','🍔 Burger','🍛 Biryani','🍜 Noodles','🥗 Healthy','🍗 Kebab'].map(x=>`<button class="chip" onclick="filterCuisine('${x.slice(2)}')">${x}</button>`).join('')}</div>
</div></section>
<section class="section" style="padding-top:10px"><div class="container"><div class="section-head"><h2>Top restaurants</h2><button class="btn btn-light" onclick="showPage('restaurants')">View all</button></div><div class="restaurant-grid">${db.restaurants.slice(0,3).map(restaurantCard).join('')}</div></div></section>`}
function restaurantCard(r){return `<article class="restaurant-card" onclick="showPage('restaurant',{id:${r.id}})">
 <div class="restaurant-image"><span class="badge">${r.tag}</span>${r.emoji}</div><div class="restaurant-info"><h3>${esc(r.name)}</h3><div class="meta"><span class="rating">★ ${r.rating}</span><span>${r.delivery} min</span><span>${'$'.repeat(r.price)}</span></div><p class="muted" style="font-size:12px;margin:8px 0">${esc(r.cuisine)}</p><div class="price-tag">Free delivery above ₹299</div></div></article>`}
function restaurantsPage(){return `<section class="section"><div class="container">
 <div class="section-head"><div><h2>Restaurants near you</h2><p class="muted">Search, filter and sort your perfect meal.</p></div></div>
 <div class="filters"><input class="input" id="restaurantSearch" placeholder="Search restaurant, dish or cuisine..." oninput="renderRestaurants()">
 <select class="select" id="priceFilter" onchange="renderRestaurants()"><option value="0">Any price</option><option value="1">₹ budget</option><option value="2">₹₹ moderate</option><option value="3">₹₹₹ premium</option></select>
 <select class="select" id="ratingFilter" onchange="renderRestaurants()"><option value="0">Any rating</option><option value="4.5">4.5+ ⭐</option><option value="4">4.0+ ⭐</option></select>
 <select class="select" id="timeFilter" onchange="renderRestaurants()"><option value="99">Any time</option><option value="25">≤25 min</option><option value="30">≤30 min</option></select>
 <select class="select" id="sortFilter" onchange="renderRestaurants()"><option value="rating">Sort: Rating</option><option value="popularity">Popularity</option><option value="price">Price</option><option value="distance">Distance</option></select></div>
 <label style="font-size:13px"><input type="checkbox" id="vegFilter" onchange="renderRestaurants()"> Vegetarian restaurants only</label>
 <div id="restaurantResults" class="restaurant-grid" style="margin-top:18px"></div>
</div></section>`}
function renderRestaurants(){
 const q=(document.getElementById('restaurantSearch')?.value||'').toLowerCase(), pf=+document.getElementById('priceFilter').value, rf=+document.getElementById('ratingFilter').value, tf=+document.getElementById('timeFilter').value, veg=document.getElementById('vegFilter').checked, sort=document.getElementById('sortFilter').value;
 let rs=db.restaurants.filter(r=>(!q||`${r.name} ${r.cuisine}`.toLowerCase().includes(q)||db.foods.filter(f=>f.rid===r.id).some(f=>f.name.toLowerCase().includes(q)))&&(!pf||r.price===pf)&&(!rf||r.rating>=rf)&&r.delivery<=tf&&(!veg||r.veg));
 rs.sort((a,b)=>sort==='rating'?b.rating-a.rating:sort==='popularity'?b.popularity-a.popularity:sort==='price'?a.price-b.price:a.distance-b.distance);
 document.getElementById('restaurantResults').innerHTML=rs.length?rs.map(restaurantCard).join(''):`<div class="empty" style="grid-column:1/-1"><div class="emoji">🔎</div>No restaurants found.</div>`;
}
function filterCuisine(c){showPage('restaurants');setTimeout(()=>{document.getElementById('restaurantSearch').value=c;renderRestaurants()},20)}
function searchFood(q){if(document.getElementById('app').querySelector('.filters')){document.getElementById('restaurantSearch').value=q;renderRestaurants()}}

function restaurantPage(id){
 const r=db.restaurants.find(x=>x.id===id), foods=db.foods.filter(x=>x.rid===id), cats=[...new Set(foods.map(x=>x.cat))];
 return `<section class="restaurant-page-hero"><div class="container"><div class="restaurant-banner"><div class="bigemoji">${r.emoji}</div><div><h1>${esc(r.name)}</h1><p>★ ${r.rating} • ${r.delivery} min • ${'$'.repeat(r.price)} • ${esc(r.cuisine)}</p><p>${r.veg?'🌿 Vegetarian options available':'🍗 Non-vegetarian specialties'}</p></div></div></div></section>
 <section class="section" style="padding-top:15px"><div class="container">${cats.map(c=>`<div><h2 class="category-title">${esc(c)}</h2><div class="food-grid">${foods.filter(f=>f.cat===c).map(foodCard).join('')}</div></div>`).join('')}</div></section>`}
function foodCard(f){return `<article class="food-card"><div class="food-img">${f.emoji}</div><div class="food-row"><div><h3>${f.veg?'<span class="veg"></span>':'<span class="veg nonveg"></span>'}${esc(f.name)}</h3><p>${esc(f.desc)}</p><div class="food-price">${money(f.price)}</div></div><button class="add-btn" onclick="openFood(${f.id})">ADD</button></div></article>`}

function openFood(id){
 const f=db.foods.find(x=>x.id===id);
 document.getElementById('modalContent').innerHTML=`<button class="close-x" onclick="closeModal()">✕</button><h2>${f.emoji} ${esc(f.name)}</h2><p class="muted">${esc(f.desc)}</p><div class="food-price">${money(f.price)}</div>
 <div class="form-group"><label>Quantity</label><div class="qty"><button onclick="changeModalQty(-1)">−</button><b id="modalQty">1</b><button onclick="changeModalQty(1)">+</button></div></div>
 <div class="form-group"><label>Add-ons</label>${f.addons.map((a,i)=>`<label style="display:block;margin:9px 0;font-weight:500"><input type="checkbox" class="addon" data-name="${esc(a.name)}" data-price="${a.price}"> ${esc(a.name)} (+${money(a.price)})</label>`).join('')}</div>
 <div class="form-group"><label>Special instructions</label><textarea class="textarea" id="instructions" placeholder="Less spicy, extra sauce..."></textarea></div>
 <button class="btn btn-primary" style="width:100%" onclick="addToCart(${f.id})">Add to cart</button>`;
 document.getElementById('modal').classList.remove('hidden');window.modalQty=1;window.modalFood=id;
}
function changeModalQty(n){window.modalQty=Math.max(1,window.modalQty+n);document.getElementById('modalQty').textContent=window.modalQty}
function addToCart(id){
 const f=db.foods.find(x=>x.id===id), addons=[...document.querySelectorAll('.addon:checked')].map(x=>({name:x.dataset.name,price:+x.dataset.price})), instructions=document.getElementById('instructions').value;
 const addonTotal=addons.reduce((a,x)=>a+x.price,0), key=Date.now();
 db.cart.push({key,foodId:id,qty:window.modalQty,addons,instructions,unit:f.price+addonTotal,foodName:f.name,emoji:f.emoji,rid:f.rid});
 save();closeModal();updateHeader();toast('Added to cart ✓');}
function openCart(){renderCart();document.getElementById('cartDrawer').classList.add('open');document.getElementById('overlay').classList.remove('hidden')}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('overlay').classList.add('hidden')}
function renderCart(){
 const el=document.getElementById('cartItems'), bottom=document.getElementById('cartBottom');
//  if(!db.cart.length){el.innerHTML='<div class="empty"><div class="emoji">🛒</div>Your cart is empty.<br><br><button class="btn btn-primary" onclick="closeCart();showPage(\\'restaurants\\')">Browse food</button></div>';bottom.innerHTML='';return}
 el.innerHTML=db.cart.map(x=>`<div class="cart-line"><div class="cart-icon">${x.emoji}</div><div class="cart-line-main"><b>${esc(x.foodName)}</b><div class="muted" style="font-size:11px">${x.addons.length?x.addons.map(a=>esc(a.name)).join(', '):'No add-ons'}</div><div class="qty"><button onclick="changeCart(${x.key},-1)">−</button><b>${x.qty}</b><button onclick="changeCart(${x.key},1)">+</button><span style="margin-left:auto">${money(x.unit*x.qty)}</span></div></div></div>`).join('');
 const total=db.cart.reduce((a,x)=>a+x.unit*x.qty,0), delivery=total>=299?0:39;
 bottom.innerHTML=`<div class="total-row"><span>Subtotal</span><span>${money(total)}</span></div><div class="total-row" style="font-size:14px"><span>Delivery</span><span>${delivery?money(delivery):'FREE'}</span></div><div class="total-row"><span>Total</span><span>${money(total+delivery)}</span></div><button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="closeCart();showPage('checkout')">Proceed to checkout</button>`;
}
function changeCart(key,n){const x=db.cart.find(x=>x.key===key);x.qty+=n;if(x.qty<=0)db.cart=db.cart.filter(x=>x.key!==key);save();renderCart();updateHeader()}
function checkoutPage(){if(!db.cart.length)return `<section class="section"><div class="container empty"><div class="emoji">🛒</div><h2>Your cart is empty</h2><button class="btn btn-primary" onclick="showPage('restaurants')">Browse restaurants</button></div></section>`;
 const subtotal=db.cart.reduce((a,x)=>a+x.unit*x.qty,0),delivery=subtotal>=299?0:39,total=subtotal+delivery;
 return `<section class="section"><div class="container"><h2>Checkout</h2><div class="checkout-grid"><div class="panel"><h3>Delivery details</h3><div class="form-group"><label>Full name</label><input class="input" id="coName" value="${db.user?.name||''}"></div><div class="form-group"><label>Phone</label><input class="input" id="coPhone" placeholder="10-digit mobile number"></div><div class="form-group"><label>Address</label><textarea class="textarea" id="coAddress" rows="3" placeholder="House, street, area, city"></textarea></div><h3>Payment</h3><label style="display:block;margin:10px"><input type="radio" name="pay" checked> Cash on Delivery</label><label style="display:block;margin:10px"><input type="radio" name="pay"> UPI (Demo)</label><button class="btn btn-primary" style="width:100%;margin-top:15px" onclick="placeOrder()">Place Order — ${money(total)}</button></div>
 <div class="summary"><h3>Order summary</h3>${db.cart.map(x=>`<div class="total-row" style="font-size:13px;font-weight:500"><span>${x.foodName} × ${x.qty}</span><span>${money(x.unit*x.qty)}</span></div>`).join('')}<hr><div class="total-row"><span>Total</span><span>${money(total)}</span></div></div></div></div></section>`}
function placeOrder(){
 if(!db.user){closeModal();openLogin('customer');return}
 const subtotal=db.cart.reduce((a,x)=>a+x.unit*x.qty,0),delivery=subtotal>=299?0:39;
 const order={id:'FG'+Date.now().toString().slice(-7),userId:db.user.id,items:structuredClone(db.cart),total:subtotal+delivery,status:1,created:new Date().toLocaleString(),address:document.getElementById('coAddress').value||'Demo address',restaurantId:db.cart[0].rid};
 db.orders.unshift(order);db.cart=[];save();updateHeader();showPage('orders');toast('Order placed successfully 🎉','success')}
const steps=['Order Placed','Restaurant Accepted','Food Preparing','Out for Delivery','Delivered'];
function tracker(status){return `<div class="tracker">${steps.map((s,i)=>`<div class="step ${i<status?'done':''}"><div class="step-circle">${i<status?'✓':i+1}</div>${s}</div>`).join('')}</div>`}
function ordersPage(){
 if(!db.user)return `<section class="section"><div class="container empty"><div class="emoji">🔐</div><h2>Login to view your orders</h2><button class="btn btn-primary" onclick="openLogin()">Login</button></div></section>`;
 const os=db.orders.filter(o=>o.userId===db.user.id);
 return `<section class="section"><div class="container"><div class="section-head"><div><h2>My Orders</h2><p class="muted">Track your current and previous orders.</p></div></div>${os.length?os.map(orderCard).join(''):`<div class="empty"><div class="emoji">🍽️</div>No orders yet.</div>`}</div></section>`}
function orderCard(o){const r=db.restaurants.find(x=>x.id===o.restaurantId);return `<div class="order-card"><div class="order-head"><div><b>Order #${o.id}</b><div class="muted">${o.created} • ${r?.name||'Restaurant'}</div></div><b>${money(o.total)}</b></div>${tracker(o.status)}<div class="order-items">${o.items.map(x=>`${x.foodName} × ${x.qty}`).join(' • ')}</div>${o.status<5?`<button class="btn btn-light btn-small" onclick="simulateOrder('${o.id}')">Simulate next status</button>`:''}</div>`}
function simulateOrder(id){let o=db.orders.find(x=>x.id===id);if(o.status<5)o.status++;save();showPage('orders');toast(o.status===5?'Delivered! Enjoy your meal 🎉':'Order status updated')}
function openAccount(){if(!db.user){openLogin();return}showPage(db.user.role==='customer'?'account':db.user.role==='restaurant'?'restaurantDash':'adminDash')}
function accountPage(){return `<section class="account-page"><div class="container"><div class="panel"><h2>Welcome, ${esc(db.user.name)} 👋</h2><p class="muted">${esc(db.user.email)}</p><div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary" onclick="showPage('orders')">My Orders</button><button class="btn btn-light" onclick="logout()">Logout</button></div></div></div></section>`}

function openLogin(role='customer'){
 document.getElementById('modalContent').innerHTML=`<button class="close-x" onclick="closeModal()">✕</button><h2>Welcome to FoodieGo</h2><p class="muted">Login or create an account.</p><div class="role-tabs" id="loginRoles">${['customer','restaurant','admin'].map((r,i)=>`<button class="${r===role?'active':''}" onclick="setLoginRole('${r}')">${r[0].toUpperCase()+r.slice(1)}</button>`).join('')}</div><div class="form-group"><label>Email</label><input class="input" id="loginEmail" value="${role==='customer'?'customer@foodiego.com':role==='restaurant'?'restaurant@foodiego.com':'admin@foodiego.com'}"></div><div class="form-group"><label>Password</label><input class="input" id="loginPass" type="password" value="123456"></div><button class="btn btn-primary" style="width:100%" onclick="login()">Login</button><div class="divider">OR</div><button class="google" onclick="googleLogin()">🌐 Continue with Google (Demo)</button><div class="form-footer"><span class="link" onclick="forgotPassword()">Forgot password?</span><span class="link" onclick="register()">Create account</span></div>`;
 window.loginRole=role;document.getElementById('modal').classList.remove('hidden')}
function setLoginRole(r){window.loginRole=r;openLogin(r)}
function login(){const email=document.getElementById('loginEmail').value.trim(),pass=document.getElementById('loginPass').value;let u=db.users.find(x=>x.email===email&&x.password===pass&&x.role===window.loginRole);if(!u){toast('Invalid email, password or role','error');return}db.user=u;save();closeModal();showPage(u.role==='customer'?'home':u.role==='restaurant'?'restaurantDash':'adminDash');toast('Welcome back, '+u.name+' 👋','success')}
function googleLogin(){const role=window.loginRole||'customer';let u=db.users.find(x=>x.role===role);if(!u){toast('No demo user for this role','error');return}db.user=u;save();closeModal();showPage(role==='customer'?'home':role==='restaurant'?'restaurantDash':'adminDash');toast('Google login demo successful','success')}
function register(){document.getElementById('modalContent').innerHTML=`<button class="close-x" onclick="closeModal()">✕</button><h2>Create account</h2><div class="role-tabs">${['customer','restaurant'].map(r=>`<button class="${r==='customer'?'active':''}" onclick="setRegRole('${r}')">${r[0].toUpperCase()+r.slice(1)}</button>`).join('')}</div><div class="form-group"><label>Name</label><input class="input" id="regName"></div><div class="form-group"><label>Email</label><input class="input" id="regEmail"></div><div class="form-group"><label>Password</label><input class="input" id="regPass" type="password"></div><button class="btn btn-primary" style="width:100%" onclick="createAccount()">Create account</button><div class="form-footer"><span></span><span class="link" onclick="openLogin()">Already have an account? Login</span></div>`;window.regRole='customer'}
function setRegRole(r){window.regRole=r;register()}
function createAccount(){const name=document.getElementById('regName').value.trim(),email=document.getElementById('regEmail').value.trim(),pass=document.getElementById('regPass').value;if(!name||!email||!pass){toast('Fill all fields','error');return}if(db.users.some(x=>x.email===email)){toast('Email already registered','error');return}const u={id:Date.now(),name,email,password:pass,role:window.regRole,restaurantId:window.regRole==='restaurant'?1:null};db.users.push(u);db.user=u;save();closeModal();showPage(window.regRole==='restaurant'?'restaurantDash':'home');toast('Account created ✓','success')}
function forgotPassword(){document.getElementById('modalContent').innerHTML=`<button class="close-x" onclick="closeModal()">✕</button><h2>Reset password</h2><p class="muted">Enter your registered email. This demo will simulate the reset email.</p><div class="form-group"><label>Email</label><input class="input" id="resetEmail" placeholder="you@example.com"></div><button class="btn btn-primary" style="width:100%" onclick="toast('Password reset link sent (demo) ✓');closeModal()">Send reset link</button>`}
function logout(){db.user=null;save();showPage('home');toast('Logged out')}
function closeModal(){document.getElementById('modal').classList.add('hidden')}

function restaurantDashboard(){
 if(!db.user||db.user.role!=='restaurant'){openLogin('restaurant');return ''}
 const rid=db.user.restaurantId||1,r=db.restaurants.find(x=>x.id===rid),os=db.orders.filter(o=>o.restaurantId===rid),todayOrders=os.length+80,revenue=os.reduce((a,x)=>a+x.total,0)+18000;
 return `<div class="admin-bar"><div class="container"><div><b>🏪 Restaurant Dashboard</b><br><small>${esc(r.name)}</small></div><button class="btn btn-light btn-small" onclick="logout()">Logout</button></div></div><section class="section"><div class="container">
 <div class="stats"><div class="stat-card"><div class="stat-icon">🧾</div><div class="label">Today's Orders</div><div class="value">${todayOrders}</div></div><div class="stat-card"><div class="stat-icon">💰</div><div class="label">Revenue</div><div class="value">${money(revenue)}</div></div><div class="stat-card"><div class="stat-icon">⭐</div><div class="label">Average Rating</div><div class="value">${r.rating}</div></div><div class="stat-card"><div class="stat-icon">🏆</div><div class="label">Best Seller</div><div class="value" style="font-size:18px">Chicken Biryani</div></div></div>
 <div class="dashboard-grid" style="margin-top:20px"><div class="sidebar"><button class="side-btn active">📊 Overview</button><button class="side-btn" onclick="showRestaurantMenu()">🍽️ Manage Menu</button><button class="side-btn" onclick="showRestaurantOrders()">🧾 Orders</button><button class="side-btn">⭐ Reviews</button><button class="side-btn">⚠️ Inventory</button></div>
 <div class="dash-content"><div class="panel"><h3>Today's performance</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:18px"><div><p class="muted">Sales target</p><div class="progress"><div style="width:78%"></div></div><p><b>78%</b> of daily target</p></div><div><p class="muted">Best-selling category</p><h2 style="margin:4px 0">🍛 Biryani</h2><p class="muted">32% of today's orders</p></div></div></div>
 <div class="panel"><h3>Inventory alerts</h3><p>🟠 Chicken — <b>Low stock</b> (8 portions left)</p><p>🟢 Basmati Rice — <b>Healthy</b></p><p>🟠 Cheese — <b>Low stock</b> (2 kg left)</p></div></div></div></div></section>`}
function showRestaurantMenu(){
 const rid=db.user.restaurantId||1,foods=db.foods.filter(f=>f.rid===rid);document.querySelector('.dash-content').innerHTML=`<div class="panel"><div class="section-head"><h3>Manage Menu</h3><button class="btn btn-primary btn-small" onclick="addFoodForm()">+ Add Food</button></div><div class="table-wrap"><table class="table"><tr><th>Dish</th><th>Category</th><th>Price</th><th>Type</th><th>Action</th></tr>${foods.map(f=>`<tr><td>${f.emoji} ${esc(f.name)}</td><td>${f.cat}</td><td>${money(f.price)}</td><td>${f.veg?'Veg':'Non-veg'}</td><td><button class="btn btn-light btn-small" onclick="editFood(${f.id})">Edit</button> <button class="btn btn-danger btn-small" onclick="deleteFood(${f.id})">Delete</button></td></tr>`).join('')}</table></div></div>`}
function addFoodForm(editId=null){
 const f=editId?db.foods.find(x=>x.id===editId):{name:'',cat:'Main Course',price:0,desc:'',veg:true,emoji:'🍽️',addons:[]};
 document.getElementById('modalContent').innerHTML=`<button class="close-x" onclick="closeModal()">✕</button><h2>${editId?'Edit':'Add'} food</h2><div class="form-group"><label>Name</label><input class="input" id="ffName" value="${esc(f.name)}"></div><div class="form-group"><label>Category</label><input class="input" id="ffCat" value="${esc(f.cat)}"></div><div class="form-group"><label>Price</label><input class="input" id="ffPrice" type="number" value="${f.price}"></div><div class="form-group"><label>Description</label><textarea class="textarea" id="ffDesc">${esc(f.desc)}</textarea></div><label><input type="checkbox" id="ffVeg" ${f.veg?'checked':''}> Vegetarian</label><button class="btn btn-primary" style="width:100%;margin-top:18px" onclick="saveFood(${editId||0})">Save food</button>`;
 document.getElementById('modal').classList.remove('hidden')}
function saveFood(id){const obj={id:id||Date.now(),rid:db.user.restaurantId||1,name:document.getElementById('ffName').value,cat:document.getElementById('ffCat').value,price:+document.getElementById('ffPrice').value,desc:document.getElementById('ffDesc').value,veg:document.getElementById('ffVeg').checked,emoji:'🍽️',addons:[]};if(id){let i=db.foods.findIndex(f=>f.id===id);db.foods[i]=obj}else db.foods.push(obj);save();closeModal();showRestaurantMenu();toast('Menu saved ✓')}
function editFood(id){addFoodForm(id)}function deleteFood(id){if(confirm('Delete this food?')){db.foods=db.foods.filter(f=>f.id!==id);save();showRestaurantMenu();toast('Food deleted')}}
function showRestaurantOrders(){const rid=db.user.restaurantId||1,os=db.orders.filter(o=>o.restaurantId===rid);document.querySelector('.dash-content').innerHTML=`<div class="panel"><h3>Manage Orders</h3><div class="table-wrap"><table class="table"><tr><th>Order</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr>${os.length?os.map(o=>`<tr><td>#${o.id}</td><td>${o.items.map(i=>i.foodName+' × '+i.qty).join(', ')}</td><td>${money(o.total)}</td><td><span class="status ${o.status===5?'green':'orange'}">${steps[o.status-1]}</span></td><td><button class="btn btn-primary btn-small" onclick="advanceRestaurantOrder('${o.id}')">Update</button></td></tr>`).join(''):`<tr><td colspan="5">No live orders.</td></tr>`}</table></div></div>`}
function advanceRestaurantOrder(id){let o=db.orders.find(x=>x.id===id);if(o.status<5)o.status++;save();showRestaurantOrders();toast('Order status updated')}
function adminDashboard(){
 if(!db.user||db.user.role!=='admin'){openLogin('admin');return ''}
 const revenue=db.orders.reduce((a,o)=>a+o.total,0)+124850,users=db.users.length+1240,orders=db.orders.length+6840;
 return `<div class="admin-bar"><div class="container"><div><b>📊 FoodieGo Admin</b><br><small>Platform overview & management</small></div><button class="btn btn-light btn-small" onclick="logout()">Logout</button></div></div><section class="section"><div class="container">
 <div class="stats"><div class="stat-card"><div class="stat-icon">👥</div><div class="label">Total Users</div><div class="value">${users.toLocaleString()}</div></div><div class="stat-card"><div class="stat-icon">🏪</div><div class="label">Restaurants</div><div class="value">${db.restaurants.length+146}</div></div><div class="stat-card"><div class="stat-icon">🧾</div><div class="label">Orders</div><div class="value">${orders.toLocaleString()}</div></div><div class="stat-card"><div class="stat-icon">💰</div><div class="label">Revenue</div><div class="value">${money(revenue)}</div></div></div>
 <div class="dashboard-grid" style="margin-top:20px"><div class="sidebar"><button class="side-btn active">📊 Overview</button><button class="side-btn" onclick="adminUsers()">👥 Users</button><button class="side-btn" onclick="adminRestaurants()">🏪 Restaurants</button><button class="side-btn">🧾 Orders</button><button class="side-btn">⚙️ Settings</button></div>
 <div class="dash-content"><div class="panel"><h3>Sales overview</h3><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px"><div><span class="muted">Today</span><h2>${money(18450)}</h2></div><div><span class="muted">This week</span><h2>${money(127890)}</h2></div><div><span class="muted">This month</span><h2>${money(498750)}</h2></div></div><div style="margin-top:15px"><div class="progress"><div style="width:84%"></div></div><p class="muted">84% of monthly revenue target</p></div></div>
 <div class="panel"><h3>Platform insights</h3><div class="table-wrap"><table class="table"><tr><th>Metric</th><th>Value</th><th>Trend</th></tr><tr><td>Cancelled orders</td><td>142</td><td>↓ 8.2%</td></tr><tr><td>Most popular food</td><td>Chicken Biryani</td><td>↑ 14%</td></tr><tr><td>Most active restaurant</td><td>Spice Route</td><td>↑ 21%</td></tr><tr><td>Average order value</td><td>₹342</td><td>↑ 5.4%</td></tr></table></div></div></div></div></div></section>`}
function adminUsers(){document.querySelector('.dash-content').innerHTML=`<div class="panel"><h3>User Management</h3><table class="table"><tr><th>Name</th><th>Email</th><th>Role</th></tr>${db.users.map(u=>`<tr><td>${esc(u.name)}</td><td>${esc(u.email)}</td><td><span class="status">${u.role}</span></td></tr>`).join('')}</table></div>`}
function adminRestaurants(){document.querySelector('.dash-content').innerHTML=`<div class="panel"><h3>Restaurant Management</h3><table class="table"><tr><th>Restaurant</th><th>Rating</th><th>Delivery</th><th>Popularity</th></tr>${db.restaurants.map(r=>`<tr><td>${r.emoji} ${esc(r.name)}</td><td>★ ${r.rating}</td><td>${r.delivery} min</td><td>${r.popularity}%</td></tr>`).join('')}</table></div>`}

document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
showPage('home');