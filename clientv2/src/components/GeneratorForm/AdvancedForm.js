import React, { useState } from 'react';
import {
  Switch,
  VStack,
  HStack,
  Box,
  Text,
  Checkbox,
  StackDivider,
} from '@chakra-ui/react';
import MultiSelect from '../MultiSelect';
import { GenerateButton } from './GenerateButton';
import { NSFWTags, safeTags } from '../MultiSelect/options';
import {
  validateExcludeTags,
  validateIncludeTags,
} from '../../utils/validateTags';
import { toast } from 'react-toastify';

import { createRandomList } from '../../adapters/api';
import { useHistory } from 'react-router';

const AdvancedForm = props => {
  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const [isAdult, setIsAdult] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async () => {
    setIsLoading(true);
    const includeFilters = validateIncludeTags(included, false);
    const excludeFilters = validateExcludeTags(excluded);
    try {
      const listID = await createRandomList({
        includeFilters,
        excludeFilters,
      });
      toast.info(listID);
      setIsLoading(false);
      history.push(`/random-lists/${listID}`);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const onIncludedChange = changes => {
    setIncluded(changes);
  };
  const onExcludedChange = changes => {
    setExcluded(changes);
  };

  return (
    <VStack alignItems={'center'} spacing={5}>
      <StackDivider />
      <HStack w="full" maxW={'md'}>
        <Checkbox
          defaultChecked={!isAdult}
          fontSize={'sm'}
          onChange={flag => setIsAdult(flag)}
        >
          Hide Adult Content
        </Checkbox>
      </HStack>
      <StackDivider />
      <MultiSelect
        as="select"
        name="Included genres"
        options={isAdult ? NSFWTags : safeTags}
        placeholder="Select a genre(s) you like"
        noOptionsMessage={() => 'No genres found'}
        onChange={onIncludedChange}
      />
      <MultiSelect
        name="Excluded genres"
        options={isAdult ? NSFWTags : safeTags}
        placeholder="Select a genre(s) you dislike"
        noOptionsMessage={() => 'No genres found'}
        onChange={onExcludedChange}
      />
      <GenerateButton isLoading={loading} onClick={onSubmit} />
    </VStack>
  );
};
export default AdvancedForm;
