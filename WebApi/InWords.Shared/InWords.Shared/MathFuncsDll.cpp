#include "MathFuncsDll.h"
int GameScore(int wordsCount, int openingQuantity)
{
	int score = 0;
	int bestOpeningsCount = wordsCount * 2 - 2;
	if (openingQuantity <= bestOpeningsCount)
		score = 3;
	else if (openingQuantity <= wordsCount * 2.25)
		score = 2;
	else if (openingQuantity <= wordsCount * 2.5) score = 1;
	return score;
}