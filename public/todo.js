var supabase = supabase.createClient(
    "https://ztigdigwgznkubzkvpwj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aWdkaWd3Z3pua3Viemt2cHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MDA5NzQsImV4cCI6MjAwMjM3Njk3NH0.YZTujUu3hXc2H2JYSGuj1Sh-Cu0roBkWOeM8S2fatWg"
  );
  async function auth() {
    if (supabase.auth.session()) {
      const user = supabase.auth.user();
      console.log(user)
      let query = { token: supabase.auth.session() };

      const headers = { "Content-Type": "application/json" };
      const res = await fetch("/login", {
        method: "POST",
        headers,
        body: JSON.stringify(query),
      });
      const json = await res.json();
      console.log(json);
    } else {
      location.pathname = "/sign-in";
    }
  }

  async function update() {
    const user = supabase.auth.user();
    if (user) {
      const { data, error } = await supabase.from("todos").select();
      if (error) {
        console.log(error);
        location.pathname = "/sign-in";
      } else {
        let main =
          '<table class="table align-items-center mb-0"><thead><tr><th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th><th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">content</th><th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Edit</th><th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Remove</th><th class="text-secondary opacity-7"></th></tr></thead><tbody>';

        for (let i = 0; i < data.length; i++) {
          main += `<tr><td><div class="d-flex px-2 py-1" id="${
            data[i].id + "T"
          }">`;
          if (data[i].complete === false) {
            main += `<a href="javascript: complete(${data[i].id});">&#x1F532; </a>`;
          } else {
            main += `<a href="javascript: uncomplete(${data[i].id});">&#x2705; </a>`;
          }
          main += ` &nbsp;${data[i].title}</div></td>`;
          main += `<td><div class="d-flex px-2 py-1" id="${
            data[i].id + "C"
          }">${data[i].content}</div></td>`;
          main +=
            `<td><div class="d-flex px-2 py-1 ml-2 text-right text-lg" style="display: inline; margin-left: 25%;"><a href="javascript: editTodo(` +
            "`" +
            data[i].id +
            "`,`" +
            escape(data[i].title) +
            "`,`" +
            escape(data[i].content) +
            "`" +
            `)">&#x1F4DD;</a></div></td>`;
          main += `<td class="align-middle text-right text-lg"><div class="d-flex align-middle px-2 py-1" style="display: inline; margin-left: 25%;"><a href="javascript: deleteTodo(${data[i].id})">&#x274C;</a></div></td>`;
          main += "</tr>";
        }
        main += "</tbody></table>";

        document.getElementById("table").innerHTML = main;
      }
    }
  }

  async function deleteTodo(id) {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .match({ id: id });
    if (error) {
      console.log(error);
    } else {
      update();
    }
  }

  async function complete(id) {
    const { data, error } = await supabase
      .from("todos")
      .update({ complete: true })
      .match({ id: id });
    if (error) {
      console.log(error);
    } else {
      update();
    }
  }

  function editTodo(id, titleO, contentO) {
    const title = document.getElementById(`${id}` + "T");
    const content = document.getElementById(`${id}` + "C");

    title.innerHTML = `<form name="${id}T" action="javascript: editSubmit(${id});"><input name="title" type="text" class="form-control form-control-sm" value="${titleO}" aria-label="Title"></form>`;
    content.innerHTML = `<form name="${id}C" action="javascript: editSubmit(${id});"><input name="content" type="text" style="height: 3em; width: 70%; margin-top: 1em; display: inline;" class="form-control form-control-sm" value="${contentO}" aria-label="Content" required><button type="submit" class="btn btn-primary btn-sm w-40" style="display: inline; margin-left: 2%;margin-top: 1em;">Update</button></form>`;
  }

  async function editSubmit(id) {
    let idt = id + "T";
    let idc = id + "C";
    console.log(idc);
    const title = document.forms[idt].title.value;
    const content = document.forms[idc].content.value;
    const { data, error } = await supabase
      .from("todos")
      .update({ title: title, content: content })
      .match({ id: id });
    if (error) {
      console.log(error);
    } else {
      update();
    }
  }

  async function uncomplete(id) {
    const { data, error } = await supabase
      .from("todos")
      .update({ complete: false })
      .match({ id: id });
    if (error) {
      console.log(error);
    } else {
      update();
    }
  }

  async function newTodo() {
    const user = supabase.auth.user();
    let title = document.forms["newTodo"].title;
    let content = document.forms["newTodo"].content;

    const { data, error } = await supabase
      .from("todos")
      .insert([
        { title: title.value, content: content.value, uuid: user.id },
      ]);

    if (error) {
      console.log(error);
    } else {
      update();
      title.value = "";
      content.value = "";
    }
  }
  auth();
  update();