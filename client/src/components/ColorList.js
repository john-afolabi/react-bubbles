import React, { useState } from "react";
import withAuth from "../helpers/axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const addColor = e => {
    e.preventDefault();
    withAuth()
      .post("http://localhost:5000/api/colors", colorToAdd)
      .then(res => {
        updateColors(res.data);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    withAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, {
        color: colorToEdit.color,
        code: colorToEdit.code,
        id: colorToEdit.id
      })
      .then(res => {
        withAuth()
          .get("http://localhost:5000/api/colors/")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => {
            alert(err.message);
          });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    withAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(colors => colors.id !== color.id));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      <div>
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
            />
          </label>
          <div className="button-row">
            <button type="submit">add color</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
