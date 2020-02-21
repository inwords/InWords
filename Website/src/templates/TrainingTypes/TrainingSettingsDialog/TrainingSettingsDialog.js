import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import FormGroup from 'src/components/FormGroup';
import Typography from 'src/components/Typography';
import Slider from 'src/components/Slider';
import Checkbox from 'src/components/Checkbox';
import Button from 'src/components/Button';
import GameCard from 'src/templates/GameCard';

import './TrainingSettingsDialog.css';

function TrainingSettingsDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit
}) {
  return (
    <Dialog
      aria-labelledby="training-settings-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="training-settings-dialog">
        Настройки тренировки
      </DialogTitle>
      <DialogContent>
        <form
          id="training-settings-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <FormGroup className="training-settings-col">
            <Typography
              component="label"
              htmlFor="training-words-quantity"
              variant="body2"
            >
              Максимум слов в тренировке
            </Typography>
            <div>
              <Slider
                id="training-words-quantity"
                name="quantity"
                min="2"
                max="8"
                value={inputs.quantity}
                onChange={handleChange}
                className="training-settings-slider"
              />
              <span>{inputs.quantity}</span>
            </div>
          </FormGroup>
          <FormGroup className="training-settings-row">
            <Typography
              component="label"
              htmlFor="training-words-voice"
              variant="body2"
            >
              Озвучивать английские слова
            </Typography>
            <Checkbox
              id="training-words-voice"
              name="voiceOn"
              checked={inputs.voiceOn}
              onChange={handleChange}
              className="training-settings-checkbox"
            />
          </FormGroup>
          <FormGroup className="training-settings-row">
            <Typography
              component="label"
              htmlFor="training-words-list-on"
              variant="body2"
            >
              Показывать слова перед тренировкой
            </Typography>
            <Checkbox
              id="training-words-list-on"
              name="listOn"
              checked={inputs.listOn}
              onChange={handleChange}
              className="training-settings-checkbox"
            />
          </FormGroup>
          <div className="training-settings-row">
            <div className="training-settings-col">
              <FormGroup className="training-settings-col">
                <Typography
                  component="label"
                  htmlFor="training-card-dimension"
                  variant="body2"
                >
                  Размер карточки
                </Typography>
                <div>
                  <Slider
                    id="training-card-dimension"
                    name="cardDimension"
                    min="80"
                    max="140"
                    step="5"
                    value={inputs.cardDimension}
                    onChange={handleChange}
                    className="training-settings-slider"
                  />
                  <span>{inputs.cardDimension}px</span>
                </div>
              </FormGroup>
              <FormGroup className="training-settings-col">
                <Typography
                  component="label"
                  htmlFor="training-card-text-size"
                  variant="body2"
                >
                  Размер текста на карточке
                </Typography>
                <div>
                  <Slider
                    id="training-card-text-size"
                    name="cardTextSize"
                    min="12"
                    max="24"
                    step="1"
                    value={inputs.cardTextSize}
                    onChange={handleChange}
                    className="training-settings-slider"
                  />
                  <span>{inputs.cardTextSize}px</span>
                </div>
              </FormGroup>
            </div>
            <div className="training-settings-col">
              <div className="training-settings-game-card-container">
                <GameCard
                  dimension={+inputs.cardDimension}
                  textSize={+inputs.cardTextSize}
                >
                  Word
                </GameCard>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отменить
        </Button>
        <Button
          type="submit"
          form="training-settings-form"
          variant="text"
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TrainingSettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  inputs: PropTypes.shape({
    quantity: PropTypes.string,
    voiceOn: PropTypes.bool,
    listOn: PropTypes.bool,
    cardDimension: PropTypes.string,
    cardTextSize: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default TrainingSettingsDialog;
