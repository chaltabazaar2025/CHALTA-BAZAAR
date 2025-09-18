<td>
  <button
    style={{ marginRight: "10px" }}
    onClick={() => router.push(`/edit-order/${o.id}`)}
  >
    Edit
  </button>
  <button
    style={{ color: "red" }}
    onClick={() => deleteOrder(o.id)}
  >
    Delete
  </button>
</td>