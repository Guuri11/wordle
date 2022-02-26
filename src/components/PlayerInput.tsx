import React from "react";

type PlayerInputProps = {
  onChangePlayerInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  playerInputValue: string;
  onSubmit: () => void;
};

function PlayerInput({
  onChangePlayerInput,
  playerInputValue,
  onSubmit,
}: PlayerInputProps) {
  return (
    <div className="player-container">
      <input
        type="text"
        className="player-input"
        onChange={onChangePlayerInput}
        maxLength={5}
        value={playerInputValue}
      />
      <button className="player-button" onClick={onSubmit}>Enviar</button>
    </div>
  );
}

export default PlayerInput;
