export default function Modal( data){

    return<>
    <div class="card" style="width: 18rem;">
  <img src={data.image} class="card-img-top" alt="..."/>
  <div class="card-body">
    <p class="card-text">{data.title} </p>
  </div>
</div>



    </>
}